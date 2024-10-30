import type { RawMeta } from "~/.server/model";
import { db } from "~/.server/db";

export async function findAchivedArticles() {
  try {
    const res: Array<RawMeta> = await db.article.findMany({
      where: {
        archived: true,
      },
      orderBy: {
        datetime: "desc",
      },
    });

    return res;
  }
  catch {
    throw new Error("find archived article list failed");
  }
}
