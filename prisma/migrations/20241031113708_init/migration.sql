/*
  Warnings:

  - Made the column `tag_id` on table `tbl_post` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbl_post" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "words" INTEGER NOT NULL DEFAULT 0,
    "brief" TEXT NOT NULL DEFAULT '',
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tag_id" INTEGER NOT NULL,
    CONSTRAINT "tbl_post_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tbl_tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tbl_post" ("archived", "brief", "create_at", "slug", "tag_id", "title", "update_at", "words") SELECT "archived", "brief", "create_at", "slug", "tag_id", "title", "update_at", "words" FROM "tbl_post";
DROP TABLE "tbl_post";
ALTER TABLE "new_tbl_post" RENAME TO "tbl_post";
CREATE UNIQUE INDEX "tbl_post_title_key" ON "tbl_post"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
