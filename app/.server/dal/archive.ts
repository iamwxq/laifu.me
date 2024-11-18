import type { PostMeta } from "~/.server/model";
import { db } from "~/.server/db";

export async function findAchivedPosts(): Promise<Array<PostMeta>> {
  const res = await db.post.findMany({
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
    include: { tag: true },
    where: { deletedAt: null },
  });

  const data: Array<PostMeta> = res.map(({ tagId, ...rest }) => rest);

  return data;
}
