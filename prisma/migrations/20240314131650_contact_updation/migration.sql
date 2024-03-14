/*
  Warnings:

  - You are about to drop the column `userId` on the `Contact` table. All the data in the column will be lost.
  - Added the required column `addedUserId` to the `Contact` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contactUserId` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "userId",
ADD COLUMN     "addedUserId" INTEGER NOT NULL,
ADD COLUMN     "contactUserId" INTEGER NOT NULL;
