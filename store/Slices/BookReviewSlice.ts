import { bookReviewSlice } from "@/types/bookReviews";
import { BookReviews } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: bookReviewSlice = {
  bookReviews: [],
  isLoaindg: false,
  Error: null,
};

const BookReviewSlice = createSlice({
  name: "BookReviewSlice",
  initialState,
  reducers: {
    setBookReviews: (state, action: PayloadAction<BookReviews[]>) => {
      state.bookReviews = action.payload;
    },
  },
});

export const { setBookReviews } = BookReviewSlice.actions;

export default BookReviewSlice.reducer;
