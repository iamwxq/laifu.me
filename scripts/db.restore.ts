import type { PostMeta } from "./types";
import path from "node:path";
import process from "node:process";
import { PrismaClient } from "@prisma/client";
import matter from "gray-matter";
import { Errors } from "./types";
import { readfile, writefile } from "./utils";

const db = new PrismaClient();
const __dirname = import.meta.dirname;
const __blogpath = path.join(__dirname, "../app/routes");

async function resolveslug(args: string[]): Promise<string> {
  let count = 0;
  const dashflag: string[] = ["-s", "--slug"];
  const fargs = Array.from(new Set(args.flatMap(arg => arg.split("="))));

  if (fargs.length < 2) {
    throw new Error(Errors.NO_SLUG);
  }
  fargs.forEach((arg) => {
    if (dashflag.includes(arg)) {
      count++;
    }
  });

  if (count < 1) {
    throw new Error(Errors.NO_SLUG);
  }
  else if (count > 1) {
    throw new Error(Errors.TO_MANY_SLUG);
  }

  const checkslug = async (slug: string) => {
    const post = await db.post.findUnique({
      select: { slug: true },
      where: { slug },
    });
    return post?.slug;
  };

  const dsi = fargs.findIndex(item => item === "-s");
  const ddsi = fargs.findIndex(item => item === "--slug");
  let slug;

  if (dsi !== -1) {
    slug = await checkslug(fargs[dsi + 1]);
  }
  else if (ddsi !== -1) {
    slug = await checkslug(fargs[ddsi + 1]);
  }
  if (!slug) {
    throw new Error(Errors.SLUG_NOT_EXIST);
  }

  return slug;
}

async function main() {
  const args = process.argv.slice(2);
  try {
    if (args.length < 1) {
      throw new Error(Errors.NO_SLUG);
    }
    const slug = await resolveslug(args);
    const post = await db.post.update({
      where: { slug },
      data: { deletedAt: null },
    });
    await db.tag.update({
      where: { id: post.tagId },
      data: {
        count: { increment: 1 },
      },
    });
    const filename = path.join(__blogpath, `blog.${slug}`, "route.mdx");
    const f = readfile(filename);
    const mtr = matter(f);
    const data = mtr.data as PostMeta;
    data.deletedAt = null;
    const fstr = matter.stringify(mtr.content, data);
    writefile({ filename, data: fstr });
    console.info(`slug: <${slug}> 恢复成功`);
  }
  catch (error: any) {
    console.error(error.message);
  }
}

main();
