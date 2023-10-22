/*
  Warnings:

  - You are about to drop the `OnlineUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "OnlineUsers";

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "senderId" INTEGER NOT NULL,
    "receiverId" INTEGER NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);
