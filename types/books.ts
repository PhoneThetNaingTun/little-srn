import { Books } from "@prisma/client";
import { BaseOption } from "./user";

export interface bookSlice {
  books: Books[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewBookPayload extends BaseOption {
  title: string;
  author: string;
  pages: string;
  price: string;
  image: string;
}
export interface EditBookPayload extends BaseOption, Books {}
export interface DeleteBookPayload extends BaseOption {
  id: string;
}
