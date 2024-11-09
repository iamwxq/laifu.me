-- CreateTable
CREATE TABLE "tbl_post" (
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

-- CreateTable
CREATE TABLE "tbl_tag" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0
);

-- CreateIndex
CREATE UNIQUE INDEX "tbl_post_title_key" ON "tbl_post"("title");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_tag_name_key" ON "tbl_tag"("name");
