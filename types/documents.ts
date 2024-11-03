import { Documents } from "@prisma/client";
import { BaseOption } from "./user";

export interface documentSlice {
  documents: Documents[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewDocumentPayload extends BaseOption {
  dname: string;
  dlink: string;
}
export interface UpdateDocumentPayload extends BaseOption, NewDocumentPayload {
  id: string;
}
export interface DeleteDocumentPayload extends BaseOption {
  id: string;
}
