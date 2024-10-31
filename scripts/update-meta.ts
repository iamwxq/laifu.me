import fs from "node:fs";
import path from "node:path";
import { PrismaClient } from "@prisma/client";
import dayjs from "dayjs";
import matter from "gray-matter";

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

const db = new PrismaClient();
const __dirname = import.meta.dirname;
const __blogpath = path.join(__dirname, "../app/routes");
const __excludes: Array<string> = ["blog.tsx", "blog_._index.tsx"];

export function readblogs(): string[] {
  const items = fs.readdirSync(__blogpath);
  return items.filter(item => (item.startsWith("blog") && !__excludes.includes(item)));
}

export function generateMeta(name: string): {
  meta: PostMeta;
  content: string;
  shouldupdate: boolean;
} {
  let shouldupdate: boolean = false;
  let updatedAt: string = "";
  const filename = path.join(__blogpath, name, "route.mdx");

  let stats, file;
  try {
    stats = fs.statSync(filename);
    file = fs.readFileSync(filename, "utf-8");
    updatedAt = dayjs(stats.mtime).format("YYYY-MM-DD HH:mm");
  }
  catch (error) {
    throw new Error(`Can't open file: ${error}`);
  }

  let meta: PostMeta, content;
  try {
    const mdx = matter(file);
    meta = mdx.data as any;
    content = mdx.content;
  }
  catch (error) {
    throw new Error(`Can't parse mdx while using gray-matter: ${error}`);
  }

  const regexparr = content.match(/[\u4E00-\u9FA5]|\b\w+\b/g);
  const words = regexparr ? regexparr.length : 0;

  meta.words = words;
  if (meta.updatedAt !== updatedAt) {
    shouldupdate = true;
    meta.updatedAt = updatedAt;
  }

  return { meta, content, shouldupdate };
}

export async function main() {
  try {
    // 获取贴文列表
    const blogs = readblogs();
    for (const blog of blogs) {
      const { meta, content, shouldupdate } = generateMeta(blog);
      // 查询贴文
      const post = await db.post.findUnique({
        where: { slug: meta.slug },
      });
      // 如果贴文已存在 且文件的修改时间发生了变化 更新贴文
      if (post && shouldupdate) {
        const { slug, createdAt, tag: tagname, ...updatedata } = meta;
        // 查询该贴文的标签 检查是否需要更新标签
        const tag = await db.tag.findUnique({
          where: { name: tagname },
        });

        let tagId;
        // 如果这个标签不存在 创建这个标签 并把数量设置为 1
        if (!tag) {
          const res = await db.tag.create({
            data: {
              name: tagname,
              count: 1,
            },
          });
          tagId = res.id;
        }
        // 查询到这个标签存在了 分为两种情况
        // 1. 这个贴文没有更新标签 用的还是原来的标签
        // 2. 这个贴文更新了标签 但是用的是数据库中已存在的其它标签
        else {
          // 1. tagId 设置为这个原标签的 id
          if (post.tagId === tag.id) {
            tagId = post.tagId;
          }
          // 2. 新标签数量 +1 旧标签数量 -1
          else {
            tagId = tag.id;
            await db.tag.update({
              where: { id: post.tagId },
              data: {
                count: { decrement: 1 },
              },
            });
            await db.tag.update({
              where: { id: tag.id },
              data: {
                count: { increment: 1 },
              },
            });
          }
        }

        // 更新数据库中的贴文元数据
        const dbupdatedpost = await db.post.update({
          where: { slug },
          data: {
            ...updatedata,
            tagId,
            updatedAt: new Date(updatedata.updatedAt),
          },
        });
        console.log("updated post from db:", dbupdatedpost);
        // 更新文件中的贴文元数据
        const { tagId: _abort, ...updatedpost } = dbupdatedpost;
        const updatedmeta: PostMeta = {
          ...updatedpost,
          tag: tagname,
          updatedAt: dayjs(updatedpost.updatedAt).format("YYYY-MM-DD HH:mm"),
          createdAt: dayjs(updatedpost.createdAt).format("YYYY-MM-DD HH:mm"),
        };
        console.log("updated meta to file:", updatedmeta);
        const strmdx = matter.stringify(content, updatedmeta);
        fs.writeFileSync(path.join(__blogpath, blog, "route.mdx"), strmdx);
      }
      // 贴文不存在 创建贴文
      else if (!post) {
        const { createdAt, tag: tagname, ...updatedata } = meta;
        // 查询该贴文的标签 检查是否需要更新标签
        const tag = await db.tag.findUnique({
          where: { name: tagname },
        });

        let tagId;
        // 如果这个标签不存在 创建这个标签 并把数量设置为 1
        if (!tag) {
          const res = await db.tag.create({
            data: {
              name: tagname,
              count: 1,
            },
          });
          tagId = res.id;
        }
        // 查询到这个标签存在了 但是是新贴文 所以把这个标签的数量 +1
        else {
          await db.tag.update({
            where: { id: tag.id },
            data: {
              count: { increment: 1 },
            },
          });
          tagId = tag.id;
        }
        // 不需要更新文件中的贴文元数据
        // 在数据库中创建该贴文的贴文元数据
        await db.post.create({
          data: {
            ...updatedata,
            tagId,
            slug: updatedata.slug,
            updatedAt: new Date(updatedata.updatedAt),
            createdAt: new Date(updatedata.updatedAt), // 第一次创建时 创建时间和更新时间相同
          },
        });
      }
    }
  }
  catch (error) {
    console.error("Something went wrong:", error);
  }
  finally {
    await db.$disconnect();
  }
}

export async function test() {
  readblogs();
}

main();
// test();
