import type { PostMeta, PRes, Statistics } from "~/.server/model";
import { db } from "~/.server/db";

// 首页文章列表
export async function findAllPosts() {
  try {
    const res: Array<PostMeta> = await db.article.findMany({
      take: 14,
      where: { archived: false },
      include: { tag: true },
      orderBy: { datetime: "desc" },
    });

    return res;
  }
  catch {
    throw new Error("find article list failed");
  }
}

// 首页统计数据
export async function findStatistics() {
  try {
    const res = await db.article.aggregate({
      _count: { _all: true },
      _sum: { words: true },
    });

    const data: Statistics = {
      articles: res._count._all,
      words: res._sum.words || 0,
    };

    return data;
  }
  catch {
    throw new Error("statistics: aggregate `count` and `sum` failed");
  }
}

// 文章页分页查询
export async function findPostsByPage(condition: { page: number }) {
  const pagesize = 10;
  const { page } = condition;

  const total = await db.article.count({
    where: {
      archived: false,
    },
  });

  const res = await db.article.findMany({
    skip: (page - 1) * pagesize,
    take: pagesize,
    where: {
      archived: false,
    },
    include: {
      tag: true,
    },
    orderBy: {
      datetime: "desc",
    },
  });

  const data: PRes<PostMeta> = {
    page,
    pagesize,
    total,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

// 文章页按标签分页查询
export async function findPostsByTagAndPage(condition: { id: number; page: number }) {
  const pagesize = 10;
  const { id, page } = condition;

  const total = await db.article.count({
    where: {
      tagId: id,
      archived: false,
    },
  });

  const res = await db.article.findMany({
    skip: (page - 1) * pagesize,
    take: pagesize,
    where: {
      tagId: id,
      archived: false,
    },
    include: {
      tag: true,
    },
    orderBy: {
      datetime: "desc",
    },
  });

  const data: PRes<PostMeta> = {
    page,
    pagesize,
    total,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

// 文章页按关键字查询
export async function findPostsByKeywordAndPage(condition: { q: string; page: number }) {
  const pagesize = 10;
  const { page, q } = condition;

  const total = await db.article.count({
    where: {
      OR: [
        { title: { contains: q } },
        { brief: { contains: q } },
      ],
    },
  });

  const res = await db.article.findMany({
    skip: (page - 1) * pagesize,
    take: pagesize,
    where: {
      OR: [
        { title: { contains: q } },
        { brief: { contains: q } },
      ],
    },
    include: {
      tag: true,
    },
    orderBy: {
      datetime: "desc",
    },
  });

  const data: PRes<PostMeta> = {
    page,
    pagesize,
    total,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

// 根据 slug 查询文章
export async function findPostBySlug(sl: string) {
  const post = await db.article.findUnique({
    where: {
      slug: sl,
    },
    include: {
      tag: true,
    },
  });

  if (!post)
    return;

  const { tagId, ...data } = post;

  return data;
}