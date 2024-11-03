import { Status } from "@prisma/client";
import { BaseOption } from "./user";

export interface statusSlice {
  status: Status[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewStatusPayload extends BaseOption {
  status: string;
}
export interface UpdateStatusPayload extends BaseOption {
  id: string;
  status: string;
}
export interface DeleteStatusPayload extends BaseOption {
  id: string;
}
