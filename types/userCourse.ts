import { UserCourses } from "@prisma/client";
import { BaseOption } from "./user";

export interface userCourseSlice {
  userCourse: UserCourses[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewUserCoursePayload extends BaseOption {
  courseId: string;
  userId: string;
}
export interface ConfirmUserCoursePayload extends BaseOption {
  id: string;
}

export interface DeleteUserCousrePayload extends BaseOption {
  id: string;
}
