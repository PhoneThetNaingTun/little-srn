import { BookReviews } from "@prisma/client";

export interface bookReviewSlice {
  bookReviews: BookReviews[];
  isLoaindg: boolean;
  Error: Error | null;
}
