import { BookReviews } from "@prisma/client";
import { BaseOption } from "./user";

export interface bookReviewSlice {
  bookReviews: BookReviews[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewBookReviewPayload extends BaseOption {
  userId: string;
  bookId: string;
  review: string;
}
