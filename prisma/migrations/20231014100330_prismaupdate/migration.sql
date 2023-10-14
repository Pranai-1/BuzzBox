/*
  Warnings:

  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the `Message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Contact" DROP CONSTRAINT "Contact_userId_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_senderId_fkey";

-- DropIndex
DROP INDEX "Contact_numberKey_key";

-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "userId";

-- DropTable
DROP TABLE "Message";

-- CreateTable
CREATE TABLE "ContactUser" (
    "contactId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ContactUser_pkey" PRIMARY KEY ("contactId","userId")
);

-- AddForeignKey
ALTER TABLE "ContactUser" ADD CONSTRAINT "ContactUser_contactId_fkey" FOREIGN KEY ("contactId") REFERENCES "Contact"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContactUser" ADD CONSTRAINT "ContactUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
