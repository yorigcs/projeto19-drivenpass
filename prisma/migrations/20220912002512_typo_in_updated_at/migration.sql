/*
  Warnings:

  - You are about to drop the column `updatet_at` on the `credentials` table. All the data in the column will be lost.
  - Added the required column `updated_at` to the `credentials` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "credentials" DROP COLUMN "updatet_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;
