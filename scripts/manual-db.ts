import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export async function insertPosts() {
  const res = await db.post.createManyAndReturn({
    data: [
      {
        slug: "movie-review-1",
        title: "电影点评 #1",
        words: 800,
        brief: "最新的电影点评，带您回顾经典",
        archived: false,
        createdAt: new Date("2024-01-10"),
        updatedAt: new Date("2024-01-11"),
        tagId: 9,
      },
      {
        slug: "film-guide",
        title: "影评指南",
        words: 1200,
        brief: "如何写出专业的影评",
        archived: false,
        createdAt: new Date("2024-02-05"),
        updatedAt: new Date("2024-02-06"),
        tagId: 9,
      },
      {
        slug: "new-movie-recommendations",
        title: "电影新片推荐",
        words: 1500,
        brief: "即将上映的热门电影推荐",
        archived: false,
        createdAt: new Date("2024-02-15"),
        updatedAt: new Date("2024-02-16"),
        tagId: 9,
      },
      {
        slug: "classic-cinema",
        title: "经典电影赏析",
        words: 900,
        brief: "经典电影的深入解析",
        archived: true,
        createdAt: new Date("2024-03-01"),
        updatedAt: new Date("2024-03-02"),
        tagId: 9,
      },
      {
        slug: "chinese-cinema-evolution",
        title: "中国电影发展史",
        words: 1800,
        brief: "中国电影的百年发展之路",
        archived: false,
        createdAt: new Date("2024-03-10"),
        updatedAt: new Date("2024-03-11"),
        tagId: 9,
      },
      {
        slug: "best-directors",
        title: "最具影响力的导演",
        words: 1400,
        brief: "全球最具影响力的电影导演盘点",
        archived: false,
        createdAt: new Date("2024-04-01"),
        updatedAt: new Date("2024-04-02"),
        tagId: 9,
      },
      {
        slug: "indie-films",
        title: "独立电影推荐",
        words: 1100,
        brief: "小众电影的独特魅力",
        archived: false,
        createdAt: new Date("2024-04-10"),
        updatedAt: new Date("2024-04-11"),
        tagId: 9,
      },
      {
        slug: "oscars-2024",
        title: "奥斯卡预测",
        words: 1300,
        brief: "2024 年奥斯卡获奖预测",
        archived: false,
        createdAt: new Date("2024-04-20"),
        updatedAt: new Date("2024-04-21"),
        tagId: 9,
      },
      {
        slug: "movie-analysis-techniques",
        title: "电影分析技巧",
        words: 1000,
        brief: "如何从多个角度分析一部电影",
        archived: false,
        createdAt: new Date("2024-05-01"),
        updatedAt: new Date("2024-05-02"),
        tagId: 9,
      },
      {
        slug: "foreign-film-appreciation",
        title: "外国电影鉴赏",
        words: 1250,
        brief: "那些不得不看的外国经典电影",
        archived: true,
        createdAt: new Date("2024-05-15"),
        updatedAt: new Date("2024-05-16"),
        tagId: 9,
      },
    ],
  });

  console.log(res);
}

export async function insertTags() {
  const res = await db.tag.createManyAndReturn({
    data: [
      { id: 1, name: "Technology", count: 5 },
      { id: 2, name: "Science", count: 3 },
      { id: 3, name: "Health", count: 2 },
      { id: 4, name: "Travel", count: 1 },
      { id: 5, name: "Education", count: 4 },
      { id: 6, name: "Finance", count: 3 },
      { id: 7, name: "Fashion", count: 2 },
      { id: 8, name: "Sports", count: 4 },
      { id: 9, name: "Movies", count: 3 },
      { id: 10, name: "Music", count: 5 },
      { id: 11, name: "Art", count: 1 },
      { id: 12, name: "Literature", count: 2 },
      { id: 13, name: "Gaming", count: 2 },
      { id: 14, name: "History", count: 1 },
      { id: 15, name: "Philosophy", count: 1 },
      { id: 16, name: "Psychology", count: 2 },
      { id: 17, name: "Politics", count: 1 },
      { id: 18, name: "Food", count: 4 },
      { id: 19, name: "Environment", count: 3 },
      { id: 20, name: "Programming", count: 5 },
    ],
  });

  console.log(res);
}

export async function findAllPosts() {
  const res = await db.post.findMany();
  console.log(res);
  console.log("posts:", res.length);
}

export async function findAllTags() {
  const res = await db.tag.findMany();
  console.log(res);
  console.log("tags:", res.length);
}

export async function updateTagsCount() {
  await db.tag.updateMany({
    data: { count: 0 },
  });

  const posts = await db.post.findMany();
  for (const post of posts) {
    await db.tag.update({
      where: { id: post.tagId },
      data: {
        count: { increment: 1 },
      },
    });
  }
}

export async function findTagById(id: number) {
  const tag = await db.tag.findUnique({
    where: { id },
  });
  console.log(tag);
}

export async function findPostBySlug(slug: string) {
  const post = await db.post.findUnique({
    where: { slug },
  });
  console.log(post);
}

export async function deletePostBySlug(slug: string) {
  const post = await db.post.delete({
    where: { slug },
  });
  console.log(post);
}

export async function main() {
  // await insertTags();
  // await insertPosts();
  // await findAllPosts();
  // await findAllTags();
  // await updateTagsCount();
  // await findTagById(1);
  // await findPostBySlug("movie-analysis-techniques");
  await deletePostBySlug("hello-world");
}

main();
