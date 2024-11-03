import { CourseReviews } from "@prisma/client";

export interface courseReviewSlice {
  courseReviews: CourseReviews[];
  isLoading: boolean;
  Error: Error | null;
}
