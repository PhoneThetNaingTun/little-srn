-- AlterTable
ALTER TABLE "BookReviews" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Books" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "BoookOrders" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CourseDetails" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CourseDocuments" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "CourseReviews" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Courses" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Documents" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Exercises" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "LectureDetails" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Lectures" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Levels" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Messages" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Status" ALTER COLUMN "createdDate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserCourses" ALTER COLUMN "createdDate" DROP NOT NULL;
