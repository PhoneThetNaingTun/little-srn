import { Questions } from "@prisma/client";
import { BaseOption } from "./user";

export interface questionSlice {
  questions: Questions[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewQuestionPayload extends BaseOption {
  questionDescription: string;
  sample: string;
  questionImage: string | null;
  exerciseId: string;
}

export interface UpdateQuestionPayload extends BaseOption, NewQuestionPayload {
  id: string;
}

export interface DeleteQuestionPayload extends BaseOption {
  id: string;
}
