/*
  Warnings:

  - Added the required column `review` to the `CourseReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CourseReviews" ADD COLUMN     "review" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UserCourses" ALTER COLUMN "isConfirm" SET DEFAULT false;
