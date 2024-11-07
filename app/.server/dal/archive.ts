import type { RawPostMeta } from "~/.server/model";
import { db } from "~/.server/db";

export async function findAchivedPosts(): Promise<Array<RawPostMeta>> {
  const res: Array<RawPostMeta> = await db.post.findMany({
    where: {
      archived: true,
      deletedAt: null,
    },
    orderBy: [
      { createdAt: "desc" },
      { updatedAt: "desc" },
    ],
  });

  return res;
}
