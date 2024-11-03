import { configureStore } from "@reduxjs/toolkit";

import AppSliceReducer from "./Slices/AppSlice";
import AdminDashBoardSliceReducer from "./Slices/AdminDashBoardSlice";
import BookSliceReducer from "./Slices/BookSlice";
import BookReviewSliceReducer from "./Slices/BookReviewSlice";
import StudentSliceReducer from "./Slices/StudentSlice";
import LevelSliceReducer from "./Slices/LevelSlice";
import StatusSliceReducer from "./Slices/StatusSlice";
import CourseSLiceReducer from "./Slices/CourseSlice";
import CourseReviewSLiceReducer from "./Slices/CourseReviewSlice";
import LectureSliceReducer from "./Slices/LectureSlice";
import LectureDetailSliceReducer from "./Slices/LectureDetailSlice";
import DocumentSliceReducer from "./Slices/DocumentSlice";
import CourseDocumentSliceReducer from "./Slices/CourseDocumentSlice";
import MessageSliceReducer from "./Slices/MessageSlice";
import ExerciseSlcieReducer from "./Slices/ExerciseSlice";
import QuestionSliceReducer from "./Slices/QuestionSlice";
import UserCourseSliceReducer from "./Slices/UserCourseSlice";

export const store = configureStore({
  reducer: {
    App: AppSliceReducer,
    AdminDashBoard: AdminDashBoardSliceReducer,
    Books: BookSliceReducer,
    BookReview: BookReviewSliceReducer,
    Students: StudentSliceReducer,
    Levels: LevelSliceReducer,
    Status: StatusSliceReducer,
    Courses: CourseSLiceReducer,
    CourseReviews: CourseReviewSLiceReducer,
    Lectures: LectureSliceReducer,
    LectureDetails: LectureDetailSliceReducer,
    Documents: DocumentSliceReducer,
    CourseDocuments: CourseDocumentSliceReducer,
    Messages: MessageSliceReducer,
    Exercises: ExerciseSlcieReducer,
    Questions: QuestionSliceReducer,
    UserCourses: UserCourseSliceReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
