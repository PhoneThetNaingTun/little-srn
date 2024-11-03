import {
  NewCourseReviewPayload,
  courseReviewSlice,
} from "@/types/courseReview";
import { CourseReviews } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: courseReviewSlice = {
  courseReviews: [],
  isLoading: false,
  Error: null,
};
export const CreateCourseReview = createAsyncThunk(
  "CourseReviewSlice/CreateCourseReview",
  async (payload: NewCourseReviewPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/courseReviews`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newCourseReview, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newCourseReview
      ? thunkapi.dispatch(addCourseReview(newCourseReview))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);
const CourseReviewSlice = createSlice({
  name: "CourseReviewSlice",
  initialState,
  reducers: {
    setCourseReviews: (state, action: PayloadAction<CourseReviews[]>) => {
      state.courseReviews = action.payload;
    },
    addCourseReview: (state, action: PayloadAction<CourseReviews>) => {
      state.courseReviews = [...state.courseReviews, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCourseReviews, setLoading, addCourseReview } =
  CourseReviewSlice.actions;

export default CourseReviewSlice.reducer;
