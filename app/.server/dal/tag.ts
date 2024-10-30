import type { Tag } from "~/.server/model";
import { db } from "~/.server/db";

export async function findManyTags() {
  try {
    const res: Array<Tag> = await db.tag.findMany({
      orderBy: [
        { count: "desc" },
        { name: "asc" },
      ],
    });

    const data = res.filter(item => item.count);

    return data;
  }
  catch {
    throw new Error("find tag list failed");
  }
}
