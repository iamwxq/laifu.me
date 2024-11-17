import type { PostMeta, PRes, Statistics } from "~/.server/model";
import { db } from "~/.server/db";

const pagesize = 10;

/**
 *  获取首页文章列表
 */
export async function findAllPosts(): Promise<Array<PostMeta>> {
  const res = await db.post.findMany({
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
    take: 14,
    include: { tag: true },
    where: { deletedAt: null },
  });

  const data: Array<PostMeta> = res.map(({ tagId, ...rest }) => rest);

  return data;
}

/**
 *  获取个人统计数据
 */
export async function findStatistics(): Promise<Statistics> {
  const res = await db.post.aggregate({
    _sum: { words: true },
    _count: { _all: true },
    where: { deletedAt: null },
  });

  const data: Statistics = {
    posts: res._count._all,
    words: res._sum.words || 0,
  };

  return data;
}

/**
 *  文章页分页查询
 */
export async function findPostsByPage(
  condition: {
    page: number;
  },
): Promise<PRes<PostMeta>> {
  const total = await db.post.count({
    where: { deletedAt: null },
  });

  const res = await db.post.findMany({
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
    take: pagesize,
    include: { tag: true },
    where: { deletedAt: null },
    skip: (condition.page - 1) * pagesize,
  });

  const data: PRes<PostMeta> = {
    total,
    pagesize,
    page: condition.page,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

/**
 *  文章页按标签分页查询
 */
export async function findPostsByTagAndPage(
  condition: {
    id: number;
    page: number;
  },
): Promise<PRes<PostMeta>> {
  const total = await db.post.count({
    where: {
      deletedAt: null,
      tagId: condition.id,
    },
  });

  const res = await db.post.findMany({
    where: {
      deletedAt: null,
      tagId: condition.id,
    },
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
    take: pagesize,
    include: { tag: true },
    skip: (condition.page - 1) * pagesize,
  });

  const data: PRes<PostMeta> = {
    total,
    pagesize,
    page: condition.page,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

/**
 *  文章页按关键字查询
 */
export async function findPostsByKeywordAndPage(
  condition: {
    q: string;
    page: number;
  },
): Promise<PRes<PostMeta>> {
  const total = await db.post.count({
    where: {
      deletedAt: null,
      OR: [
        { title: { contains: condition.q } },
        { brief: { contains: condition.q } },
      ],
    },
  });

  const res = await db.post.findMany({
    where: {
      deletedAt: null,
      OR: [
        { title: { contains: condition.q } },
        { brief: { contains: condition.q } },
      ],
    },
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
    take: pagesize,
    include: { tag: true },
    skip: (condition.page - 1) * pagesize,
  });

  const data: PRes<PostMeta> = {
    total,
    pagesize,
    page: condition.page,
    totalpage: Math.ceil(total / pagesize),
    data: res.map(({ tagId, ...rest }) => rest),
  };

  return data;
}

/**
 *  根据 slug 查询文章
 */
export async function findPostBySlug(
  condition: {
    slug: string;
  },
): Promise<PostMeta | undefined > {
  const post = await db.post.findUnique({
    include: { tag: true },
    where: {
      deletedAt: null,
      slug: condition.slug,
    },
  });

  return post
    ? {
      tag: post.tag,
      slug: post.slug,
      brief: post.brief,
      title: post.title,
      words: post.words,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      deletedAt: post.deletedAt,
    } satisfies PostMeta
    : undefined;
}

/**
 *  获取所有的 slugs
 */
export async function findAllSlugs(): Promise<Array<string>> {
  const slugs = await db.post.findMany({
    where: { deletedAt: null },
    select: { slug: true },
  });

  return slugs.map(item => item.slug);
}
