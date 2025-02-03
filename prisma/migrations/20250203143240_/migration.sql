-- CreateTable
CREATE TABLE "UserChannels" (
    "userId" INTEGER NOT NULL,
    "channelId" INTEGER NOT NULL,

    PRIMARY KEY ("userId", "channelId"),
    CONSTRAINT "UserChannels_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "UserChannels_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
