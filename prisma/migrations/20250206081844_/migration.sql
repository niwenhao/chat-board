/*
  Warnings:

  - You are about to drop the `UserChannels` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "UserChannels";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "UserChannel" (
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "channelId"),
    CONSTRAINT "UserChannel_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserChannel_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
