import { CourseReviews } from "@prisma/client";
import { BaseOption } from "./user";

export interface courseReviewSlice {
  courseReviews: CourseReviews[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewCourseReviewPayload extends BaseOption {
  userId: string;
  courseId: string;
  review: string;
}
