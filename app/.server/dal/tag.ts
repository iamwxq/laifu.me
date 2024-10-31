import type { Tag } from "~/.server/model";
import { db } from "~/.server/db";

export async function findManyTags() {
  const res: Array<Tag> = await db.tag.findMany({
    orderBy: [
      { count: "desc" },
      { name: "asc" },
    ],
  });

  const data = res.filter(item => item.count > 0);

  return data;
}
