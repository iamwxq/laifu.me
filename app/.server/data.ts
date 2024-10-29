export interface Tag {
  name: string;
  count: number;
}

export interface MetaData {
  slug: string;
  title: string;
  brief: string;
  datetime: string;
  views: number;
  archived: boolean;
  tag: Tag;
}

export interface Statistics {
  articles: number;
  words: number;
}

export async function wait(s: number) {
  const ms = s * 1_000;
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function getFakeArticleList() {
  const data = Array.from<MetaData>({ length: 16 })
    .fill({
      slug: "how-to-build-blog-with-remix",
      title: "如何使用 Remix 框架构建一个博客网站",
      brief: "本文深入探讨了AI生成内容（AIGC）的技术原理及其局限性，尤其是其在模拟人类语言和行为方面的不足。通过分析自回归模型的局限性、机器学习中的过拟合与泛化问题、以",
      datetime: "2024-10-29 11:45",
      views: 0,
      archived: false,
      tag: {
        count: 1,
        name: "Remix",
      },
    })
    .map((item, i) => ({ ...item, slug: item.slug + i }));

  // await wait(1);
  return data;
}

export async function getFakeStatistics() {
  const data: Statistics = {
    articles: 1,
    words: 3691345,
  };

  return data;
}
