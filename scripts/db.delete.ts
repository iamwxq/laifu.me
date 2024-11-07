import process from "node:process";
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

enum Errors {
  NO_SLUG = "必须通过 '-s <SLUG>'、'--slug <SLUG>'、'-s=<SLUG>' 或 '--slug=<SLUG>' 传入文章的 slug 参数",
  TO_MANY_SLUG = "'-s <SLUG>'、'--slug <SLUG>'、'-s=<SLUG>' 或 '--slug=<SLUG>' 只能传入其中一种格式",
  SLUG_NOT_EXIST = "SLUG 不存在，请检查",
}

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
      data: { deletedAt: new Date() },
    });
    await db.tag.update({
      where: { id: post.tagId },
      data: {
        count: { decrement: 1 },
      },
    });
    console.info(`删除 <${slug.toUpperCase()}> 成功`);
  }
  catch (error: any) {
    console.error(error.message);
  }
}

main();
