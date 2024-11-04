import { NewBookReviewPayload, bookReviewSlice } from "@/types/bookReviews";
import { BookReviews } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bookReviewSlice = {
  bookReviews: [],
  isLoading: false,
  Error: null,
};
export const CreateBookReviews = createAsyncThunk(
  "BookReviewSlice/CreateBookReviews",
  async (payload: NewBookReviewPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookReviews`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newBookReview, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newBookReview ? thunkapi.dispatch(addBookReviews(newBookReview)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);

const BookReviewSlice = createSlice({
  name: "BookReviewSlice",
  initialState,
  reducers: {
    setBookReviews: (state, action: PayloadAction<BookReviews[]>) => {
      state.bookReviews = action.payload;
    },
    addBookReviews: (state, action: PayloadAction<BookReviews>) => {
      state.bookReviews = [...state.bookReviews, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBookReviews, setLoading, addBookReviews } =
  BookReviewSlice.actions;

export default BookReviewSlice.reducer;
