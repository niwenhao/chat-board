-- CreateTable
CREATE TABLE "Channel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Channel_name_key" ON "Channel"("name");
