/*
  Warnings:

  - You are about to drop the column `create_at` on the `tbl_post` table. All the data in the column will be lost.
  - You are about to drop the column `update_at` on the `tbl_post` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_tbl_post" (
    "slug" TEXT NOT NULL PRIMARY KEY,
    "hash" TEXT,
    "title" TEXT NOT NULL,
    "words" INTEGER NOT NULL DEFAULT 0,
    "brief" TEXT NOT NULL DEFAULT '',
    "archived" BOOLEAN NOT NULL DEFAULT false,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted_at" DATETIME,
    "tag_id" INTEGER NOT NULL,
    CONSTRAINT "tbl_post_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tbl_tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_tbl_post" ("archived", "brief", "deleted_at", "hash", "slug", "tag_id", "title", "words") SELECT "archived", "brief", "deleted_at", "hash", "slug", "tag_id", "title", "words" FROM "tbl_post";
DROP TABLE "tbl_post";
ALTER TABLE "new_tbl_post" RENAME TO "tbl_post";
CREATE UNIQUE INDEX "tbl_post_title_key" ON "tbl_post"("title");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
