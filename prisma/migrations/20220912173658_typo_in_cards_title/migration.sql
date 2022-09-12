/*
  Warnings:

  - You are about to drop the column `tittle` on the `cards` table. All the data in the column will be lost.
  - Added the required column `title` to the `cards` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "cards" DROP COLUMN "tittle",
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "is_virtual" SET DEFAULT false;
