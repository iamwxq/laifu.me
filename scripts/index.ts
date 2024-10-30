import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createMany() {
  try {
    const data = await prisma.article.createMany({
      data: [
        {
          slug: "understanding-javascript-promises",
          title: "Understanding JavaScript Promises",
          brief: "A guide to mastering asynchronous programming with Promises",
          datetime: new Date("2024-10-12"),
          archived: false,
          tagId: 12,
        },
        {
          slug: "intro-to-docker-and-containers",
          title: "Introduction to Docker and Containers",
          brief: "Learn the basics of containerization with Docker",
          datetime: new Date("2024-09-18"),
          archived: false,
          tagId: 7,
        },
        {
          slug: "vue-3-composition-api",
          title: "Getting Started with Vue 3 Composition API",
          brief: "Explore the new Composition API in Vue 3",
          datetime: new Date("2024-08-25"),
          archived: false,
          tagId: 15,
        },
        {
          slug: "testing-with-jest",
          title: "Testing JavaScript Applications with Jest",
          brief: "An introduction to testing with the Jest framework",
          datetime: new Date("2024-07-14"),
          archived: false,
          tagId: 10,
        },
        {
          slug: "intro-to-python-for-devs",
          title: "Introduction to Python for Developers",
          brief: "A beginner-friendly guide to Python programming",
          datetime: new Date("2024-06-02"),
          archived: false,
          tagId: 4,
        },
        {
          slug: "svelte-beginners-guide",
          title: "Svelte for Beginners",
          brief: "A guide to building applications with Svelte",
          datetime: new Date("2024-05-22"),
          archived: false,
          tagId: 18,
        },
        {
          slug: "managing-state-with-redux",
          title: "Managing State with Redux",
          brief: "Learn the fundamentals of state management using Redux",
          datetime: new Date("2024-04-10"),
          archived: false,
          tagId: 2,
        },

      ],
    });
    console.log(data);
  }
  catch (error) {
    throw new Error(`"create tag failed: ${error}`);
  }
  finally {
    await prisma.$disconnect();
  }
}

// createTag();

export async function findAll() {
  try {
    const data = await prisma.article.findMany();
    console.log(data);
  }
  catch {
    throw new Error("find tags failed");
  }
  finally {
    await prisma.$disconnect();
  }
}

// findAll();
// createMany();

export async function findManyArticleWithTag() {
  try {
    const data = await prisma.article.findMany({
      include: {
        tag: true,
      },
    },
    );

    console.log(data);
  }
  catch {
    throw new Error("find tags failed");
  }
  finally {
    await prisma.$disconnect();
  }
}

// findManyArticleWithTag();

export async function deleteArticle() {
  await prisma.article.delete({
    where: { slug: "how-to-build-website-with-remix" },
  });
  await prisma.$disconnect();
}

// deleteArticle();

// createMany();

export async function updateTagCount() {
  const articles = await prisma.article.findMany();
  await prisma.tag.updateMany({
    data: {
      count: 0,
    },
  });
  for (const article of articles) {
    await prisma.tag.update({
      where: {
        id: article.tagId || 0,
      },
      data: {
        count: {
          increment: 1,
        },
      },
    });
  }
  await prisma.$disconnect();
}

updateTagCount();
