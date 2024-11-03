import { Levels } from "@prisma/client";
import { BaseOption } from "./user";

export interface levelSlice {
  levels: Levels[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewLevelPayload extends BaseOption {
  level: string;
}

export interface UpdateLevelPayload extends BaseOption, NewLevelPayload {
  id: string;
}
export interface DeleteLevelPayload extends BaseOption {
  id: string;
}
