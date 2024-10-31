import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export async function createMany() {
  try {
    const data = await prisma.article.createMany({
      data: [
        {
          slug: "getting-started-with-go",
          title: "Getting Started with Go",
          brief: "A beginner's guide to the Go programming language",
          datetime: new Date("2024-10-01"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "go-concurrency-patterns",
          title: "Concurrency Patterns in Go",
          brief: "Exploring concurrency patterns using goroutines and channels",
          datetime: new Date("2024-10-02"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "error-handling-in-go",
          title: "Error Handling in Go",
          brief: "Best practices for handling errors in Go applications",
          datetime: new Date("2024-10-03"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "understanding-go-interfaces",
          title: "Understanding Interfaces in Go",
          brief: "A guide to using interfaces effectively in Go",
          datetime: new Date("2024-10-04"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "build-cli-with-go",
          title: "Building CLI Applications with Go",
          brief: "Learn how to create command-line applications in Go",
          datetime: new Date("2024-10-05"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "getting-started-with-rust",
          title: "Getting Started with Rust",
          brief: "An introductory guide to Rust programming",
          datetime: new Date("2024-10-06"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-ownership-and-borrowing",
          title: "Rust Ownership and Borrowing",
          brief: "Understanding the ownership and borrowing system in Rust",
          datetime: new Date("2024-10-07"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "error-handling-in-rust",
          title: "Error Handling in Rust",
          brief: "Learn how to handle errors in Rust effectively",
          datetime: new Date("2024-10-08"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-memory-safety",
          title: "Memory Safety in Rust",
          brief: "How Rust ensures memory safety without a garbage collector",
          datetime: new Date("2024-10-09"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "async-programming-in-rust",
          title: "Async Programming in Rust",
          brief: "An introduction to asynchronous programming with Rust",
          datetime: new Date("2024-10-10"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-error-handling-patterns",
          title: "Rust Error Handling Patterns",
          brief: "Common patterns for handling errors in Rust applications",
          datetime: new Date("2024-10-11"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "unit-testing-in-go",
          title: "Unit Testing in Go",
          brief: "How to write and run tests in Go",
          datetime: new Date("2024-10-12"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "using-generics-in-rust",
          title: "Using Generics in Rust",
          brief: "A guide to generic types and functions in Rust",
          datetime: new Date("2024-10-13"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-web-development",
          title: "Web Development with Rust",
          brief: "Introduction to building web applications in Rust",
          datetime: new Date("2024-10-14"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "building-rest-apis-with-go",
          title: "Building REST APIs with Go",
          brief: "Create RESTful APIs using the Go programming language",
          datetime: new Date("2024-10-15"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "error-handling-patterns-in-go",
          title: "Error Handling Patterns in Go",
          brief: "Common ways to handle errors in Go applications",
          datetime: new Date("2024-10-16"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-crate-management",
          title: "Managing Dependencies with Cargo in Rust",
          brief: "A guide to using Cargo to manage Rust dependencies",
          datetime: new Date("2024-10-17"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "memory-management-in-go",
          title: "Memory Management in Go",
          brief: "How Go handles memory management and garbage collection",
          datetime: new Date("2024-10-18"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "rust-smart-pointers",
          title: "Smart Pointers in Rust",
          brief: "Understanding and using smart pointers in Rust",
          datetime: new Date("2024-10-19"),
          archived: false,
          tagId: 2,
        },
        {
          slug: "concurrency-in-rust",
          title: "Concurrency in Rust",
          brief: "Exploring concurrency concepts and tools in Rust",
          datetime: new Date("2024-10-20"),
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

findManyArticleWithTag();

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

// updateTagCount();
