import type { Buffer } from "node:buffer";
import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import matter from "gray-matter";
import { hash, readdir, readfile, writefile } from "./utils";

interface PostMeta {
  tag: string;
  slug: string;
  title: string;
  brief: string;
  words: number;
  archived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface QueueItem {
  meta: PostMeta;
  content: string;
  filename: string;
}

interface Queue {
  updates: QueueItem[];
  creates: QueueItem[];
}

enum DBConsts {
  TAG_NOT_EXIST = -9999,
  TAG_NOT_CHANGED = -8888,
}

const db = new PrismaClient();
const __dirname = import.meta.dirname;
const __blogpath = path.join(__dirname, "../app/routes");
const __excludes: Array<string> = ["blog.tsx", "blog_._index.tsx"];

async function taskqueue(dirs: string[]): Promise<Queue> {
  const q: Queue = { creates: [], updates: [] };

  for (const dir of dirs) {
    const filename = path.join(__blogpath, dir, "route.mdx");
    const f = readfile(filename);
    const mtr = matter(f);
    const data = mtr.data as PostMeta;
    const slug = data.slug;
    const h = hash(JSON.stringify(data), mtr.content);

    const post = await db.post.findUnique({
      where: { slug },
    });

    const item: QueueItem = {
      filename,
      meta: data,
      content: mtr.content,
    };

    // create if post not exists
    if (!post) {
      q.creates.push(item);
      continue;
    }

    // update if post hash changed
    if (post.hash !== h) {
      q.updates.push(item);
    }

    // do nothing if hash doesn't change
  }

  return q;
}

async function existtag(tagname: string): Promise<number> {
  const tag = await db.tag.findUnique({
    where: { name: tagname },
  });
  if (tag) {
    return tag.id;
  }
  return DBConsts.TAG_NOT_EXIST;
}

async function checktag({
  slug,
  tagid,
  tagname,
}: {
  slug: string;
  tagid: number;
  tagname: string;
}): Promise<number> {
  let restag: number = tagid;
  const post = (await db.post.findUnique({
    select: { tagId: true },
    where: { slug },
  })) as { tagId: number };

  if (post.tagId === tagid) {
    return restag;
  }

  await db.tag.update({
    where: { id: post.tagId },
    data: {
      count: { decrement: 1 },
    },
  });
  if (tagid !== DBConsts.TAG_NOT_EXIST) {
    await db.tag.update({
      where: { id: tagid },
      data: {
        count: { increment: 1 },
      },
    });
  }
  else {
    const { id } = await db.tag.create({
      data: {
        count: 1,
        name: tagname,
      },
    });
    restag = id;
  }

  return restag;
}

export async function main() {
  let dirs = readdir(path.join(__blogpath), { exclude: __excludes });
  dirs = dirs.filter(dir => dir.startsWith("blog"));

  const q = await taskqueue(dirs);
  const regexp = /[\u4E00-\u9FA5]|\b\w+\b/g;

  const createresolver = async () => {
    console.info("\nStart [create] queue:");
    console.info(q.creates.map(item => item.filename));
    q.creates.forEach(async (item) => {
      const et = await existtag(item.meta.tag);
      let createdtagid: number = et;
      if (et !== DBConsts.TAG_NOT_EXIST) {
        await db.tag.update({
          where: { id: et },
          data: {
            count: { increment: 1 },
          },
        });
      }
      else {
        const t = await db.tag.create({
          data: {
            name: item.meta.tag,
            count: 1,
          },
        });
        createdtagid = t.id;
      }
      const now = new Date();
      const dayjsnow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
      const regmatch = item.content.match(regexp);
      const words = regmatch ? regmatch.length : 0;
      const {
        hash: _h,
        tagId,
        ...createdpost
      } = await db.post.create({
        data: {
          words,
          createdAt: now,
          updatedAt: now,
          tagId: createdtagid,
          slug: item.meta.slug,
          title: item.meta.title,
          brief: item.meta.brief,
          archived: item.meta.archived,
        },
      });

      const fstr = matter.stringify(
        item.content,
        {
          ...createdpost,
          tag: item.meta.tag,
          createdAt: dayjsnow,
          updatedAt: dayjsnow,
        },
      );
      writefile({ filename: item.filename, data: fstr });
      const rf = readfile(item.filename);
      const mtr = matter(rf);
      const h = hash(JSON.stringify(mtr.data), mtr.content);
      await db.post.update({
        where: { slug: createdpost.slug },
        data: { hash: h },
      });
      console.info(`slug: <${mtr.data.slug}> success, hash: ${h}`);
    });
  };

  const updateresolver = async () => {
    console.info("\nStart [update] queue:");
    console.info(q.updates.map(item => item.filename));
    q.updates.forEach(async (item) => {
      const et = await existtag(item.meta.tag);
      const updatedtagid = await checktag({
        tagid: et,
        slug: item.meta.slug,
        tagname: item.meta.tag,
      });
      const now = new Date();
      const dayjsnow = dayjs(now).format("YYYY-MM-DD HH:mm:ss");
      const regmatch = item.content.match(regexp);
      const words = regmatch ? regmatch.length : 0;
      const {
        hash: _h,
        tagId,
        ...updatedpost
      } = await db.post.update({
        where: { slug: item.meta.slug },
        data: {
          words,
          updatedAt: now,
          tagId: updatedtagid,
          slug: item.meta.slug,
          title: item.meta.title,
          brief: item.meta.brief,
          archived: item.meta.archived,
        },
      });

      const fstr = matter.stringify(
        item.content,
        {
          ...updatedpost,
          tag: item.meta.tag,
          updatedAt: dayjsnow,
          createdAt: item.meta.createdAt,
        },
      );
      writefile({ filename: item.filename, data: fstr });
      const rf = readfile(item.filename);
      const mtr = matter(rf);
      const h = hash(JSON.stringify(mtr.data), mtr.content);
      await db.post.update({
        where: { slug: updatedpost.slug },
        data: { hash: h },
      });
      console.info(`slug: <${mtr.data.slug}> success, hash: ${h}`);
    });
  };

  await createresolver();
  await updateresolver();
}

main();
