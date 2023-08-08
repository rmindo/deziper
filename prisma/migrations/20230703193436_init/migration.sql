-- CreateTable
CREATE TABLE "Users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "avatar" TEXT,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "bio" TEXT,
    "role" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Posts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "media" TEXT,
    "status" TEXT NOT NULL,
    "content" TEXT,
    "parent" TEXT NOT NULL,
    "author" INTEGER NOT NULL,
    "updated" DATETIME NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categories" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    CONSTRAINT "Posts_author_fkey" FOREIGN KEY ("author") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Posts_parent_fkey" FOREIGN KEY ("parent") REFERENCES "Pages" ("title") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pages" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "slug" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Page',
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "content" TEXT,
    "author" INTEGER NOT NULL,
    "updated" DATETIME NOT NULL,
    "created" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "template" TEXT,
    "description" TEXT,
    CONSTRAINT "Pages_author_fkey" FOREIGN KEY ("author") REFERENCES "Users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_id_key" ON "Users"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE INDEX "Users_id_idx" ON "Users"("id");

-- CreateIndex
CREATE INDEX "Users_email_idx" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_id_key" ON "Posts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Posts_slug_key" ON "Posts"("slug");

-- CreateIndex
CREATE INDEX "Posts_id_idx" ON "Posts"("id");

-- CreateIndex
CREATE INDEX "Posts_slug_idx" ON "Posts"("slug");

-- CreateIndex
CREATE INDEX "Posts_parent_idx" ON "Posts"("parent");

-- CreateIndex
CREATE INDEX "Posts_status_idx" ON "Posts"("status");

-- CreateIndex
CREATE INDEX "Posts_author_idx" ON "Posts"("author");

-- CreateIndex
CREATE INDEX "Posts_content_idx" ON "Posts"("content");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_id_key" ON "Pages"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_slug_key" ON "Pages"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Pages_title_key" ON "Pages"("title");

-- CreateIndex
CREATE INDEX "Pages_id_idx" ON "Pages"("id");

-- CreateIndex
CREATE INDEX "Pages_slug_idx" ON "Pages"("slug");

-- CreateIndex
CREATE INDEX "Pages_status_idx" ON "Pages"("status");

-- CreateIndex
CREATE INDEX "Pages_author_idx" ON "Pages"("author");

-- CreateIndex
CREATE INDEX "Pages_content_idx" ON "Pages"("content");
