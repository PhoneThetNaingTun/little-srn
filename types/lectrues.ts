import { Lectures } from "@prisma/client";
import { BaseOption } from "./user";

export interface lectureSlice {
  lectures: Lectures[];
  isLoading: boolean;
  Error: Error | null;
}
export interface NewLecturePayload extends BaseOption {
  title: string;
  courseId: string;
}

export interface UpdateLecturePayload extends NewLecturePayload, BaseOption {
  id: string;
}
export interface DeleteLecturePayload extends BaseOption {
  id: string;
}
