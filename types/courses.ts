import { Courses } from "@prisma/client";
import { BaseOption } from "./user";

export interface courseSlice {
  courses: Courses[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewCoursePayload extends BaseOption {
  image: string | null;
  levelId: string;
  statusId: string;
  cName: string;
  video: string | null;
  videoLabel: string;
  cHour: string;
  description: string | null;
  cPractice: string;
  zoomFee: string | null;
  teachYourSelfField: string | null;
}
export interface UpdateCoursePayload extends BaseOption, NewCoursePayload {
  id: string;
}
export interface DeleteCoursePayload extends BaseOption {
  id: string;
}
