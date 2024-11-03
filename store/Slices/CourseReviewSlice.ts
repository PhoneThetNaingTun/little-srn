import { courseReviewSlice } from "@/types/courseReview";
import { CourseReviews } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: courseReviewSlice = {
  courseReviews: [],
  isLoading: false,
  Error: null,
};

const CourseReviewSlice = createSlice({
  name: "CourseReviewSlice",
  initialState,
  reducers: {
    setCourseReviews: (state, action: PayloadAction<CourseReviews[]>) => {
      state.courseReviews = action.payload;
    },
  },
});

export const { setCourseReviews } = CourseReviewSlice.actions;

export default CourseReviewSlice.reducer;
