import { Exercises } from "@prisma/client";
import { BaseOption } from "./user";

export interface exerciseSlice {
  exercises: Exercises[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewExercisePayload extends BaseOption {
  ename: string;
  courseId: string;
}
export interface UpdateExercisePayload extends BaseOption, NewExercisePayload {
  id: string;
}
export interface DeleteExercisePayload extends BaseOption {
  id: string;
}
