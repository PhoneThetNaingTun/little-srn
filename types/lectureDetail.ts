import { LectureDetails } from "@prisma/client";
import { BaseOption } from "./user";

export interface lectureDetailSlice {
  lectureDetails: LectureDetails[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewLectureDetailPayload extends BaseOption {
  lectureDetailName: string;
  lectureLink: string;
  lectureId: string;
}
export interface UpdateLectureDetailPayload
  extends BaseOption,
    NewLectureDetailPayload {
  id: string;
}
export interface DeleteLectureDetailPayload extends BaseOption {
  id: string;
}
