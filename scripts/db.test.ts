import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

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
  const post = await db.post.update({
    where: { slug },
    data: { deletedAt: new Date() },
  });
  console.log(post);
}

export async function restorePostBySlug(slug: string) {
  const post = await db.post.update({
    where: { slug },
    data: { deletedAt: null },
  });
  console.log(post);
}

export async function hardDeletePostBySlug(slug: string) {
  const post = await db.post.delete({
    where: { slug },
  });
  console.log(post);
}

export async function seeds() {
  // Insert Tags with Posts
  await db.tag.create({
    data: {
      name: "Technology",
      count: 5,
      Post: {
        create: [
          {
            slug: "tech-trends-2024",
            title: "Top Technology Trends in 2024",
            brief: "A brief overview of the top tech trends.",
            createdAt: new Date("2024-01-01T10:00:00Z"),
            updatedAt: new Date("2024-01-01T10:00:00Z"),
          },
          {
            slug: "ai-revolution",
            title: "The AI Revolution",
            brief: "How AI is reshaping industries.",
            createdAt: new Date("2024-02-05T12:30:00Z"),
            updatedAt: new Date("2024-02-05T12:30:00Z"),
          },
          {
            slug: "quantum-computing",
            title: "Quantum Computing Explained",
            brief: "A beginner’s guide to quantum computing.",
            createdAt: new Date("2024-03-10T08:45:00Z"),
            updatedAt: new Date("2024-03-10T08:45:00Z"),
          },
        ],
      },
    },
  });

  await db.tag.create({
    data: {
      name: "Health",
      count: 2,
      Post: {
        create: [
          {
            slug: "mental-health-awareness",
            title: "Mental Health Awareness in 2024",
            brief: "The importance of mental health in the modern world.",
            createdAt: new Date("2024-04-15T14:20:00Z"),
            updatedAt: new Date("2024-04-15T14:20:00Z"),
          },
          {
            slug: "nutrition-guide",
            title: "A Guide to Balanced Nutrition",
            brief: "Tips for achieving a balanced diet.",
            createdAt: new Date("2024-05-01T11:00:00Z"),
            updatedAt: new Date("2024-05-01T11:00:00Z"),
          },
        ],
      },
    },
  });

  await db.tag.create({
    data: {
      name: "Lifestyle",
      count: 3,
      Post: {
        create: [
          {
            slug: "minimalism-lifestyle",
            title: "Minimalism: A Lifestyle Choice",
            brief: "How minimalism can simplify your life.",
            createdAt: new Date("2024-06-25T09:00:00Z"),
            updatedAt: new Date("2024-06-25T09:00:00Z"),
          },
          {
            slug: "remote-work",
            title: "The Rise of Remote Work",
            brief: "Why remote work is becoming the new normal.",
            createdAt: new Date("2024-07-10T16:30:00Z"),
            updatedAt: new Date("2024-07-10T16:30:00Z"),
          },
          {
            slug: "productivity-hacks",
            title: "Top Productivity Hacks for 2024",
            brief: "Boost your productivity with these simple tips.",
            createdAt: new Date("2024-08-12T13:45:00Z"),
            updatedAt: new Date("2024-08-12T13:45:00Z"),
          },
        ],
      },
    },
  });
}

export async function main() {
  // await insertTags();
  // await insertPosts();
  // await deletePostBySlug("test-permission");
  // await restorePostBySlug("test-permission");
  // await hardDeletePostBySlug("test-permission");
  // await hardDeletePostBySlug("hello-world");
  await findAllPosts();
  // await findAllTags();
  // await updateTagsCount();
  // await findTagById(1);
  // await findPostBySlug("movie-analysis-techniques");
  // await deletePostBySlug("hello-world");
  // await seeds();
}

main();
