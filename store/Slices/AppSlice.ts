import { App, UpdateUserPayload, UserApp } from "@/types/user";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setBooks } from "./BookSlice";
import { setLevels } from "./LevelSlice";
import { setStudents } from "./StudentSlice";
import { setStatus } from "./StatusSlice";
import { setCourses } from "./CourseSlice";
import { setLectures } from "./LectureSlice";
import { setMessages } from "./MessageSlice";
import { setExercise } from "./ExerciseSlice";
import { setQuestions } from "./QuestionSlice";
import { setDocument } from "./DocumentSlice";
import { setBookReviews } from "./BookReviewSlice";
import { setCourseReviews } from "./CourseReviewSlice";
import { setLectureDetails } from "./LectureDetailSlice";
import { setCourseDocuments } from "./CourseDocumentSlice";
import { setUserCourse } from "./UserCourseSlice";

const initialState: UserApp = {
  user: {
    image: "",
    id: "",
    role: "User",
    name: "",
    email: "",
    emailVerified: null,
    phone: "",
    dateOfBirth: "",
    password: "",
    createdDate: null,
  },
  userAppLoading: false,
  error: null,
  init: false,
};

export const fetchApp = createAsyncThunk(
  "UserSlice/fetchApp",
  async (_, thunkapi) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/app`, {
      method: "GET",
    });
    const dataFromServer = await response.json();
    const {
      userFromDb,
      books,
      bookReviews,
      users,
      levels,
      status,
      courses,
      courseReviews,
      lectures,
      lectureDetails,
      documents,
      courseDocuments,
      messages,
      exercises,
      questions,
      userCourses,
    } = dataFromServer;

    thunkapi.dispatch(setBooks(books));
    thunkapi.dispatch(setLevels(levels));
    thunkapi.dispatch(setStatus(status));
    thunkapi.dispatch(setStudents(users));
    thunkapi.dispatch(setCourses(courses));
    thunkapi.dispatch(setUser(userFromDb));
    thunkapi.dispatch(setLectures(lectures));
    thunkapi.dispatch(setMessages(messages));
    thunkapi.dispatch(setExercise(exercises));
    thunkapi.dispatch(setQuestions(questions));
    thunkapi.dispatch(setDocument(documents));
    thunkapi.dispatch(setUserCourse(userCourses));
    thunkapi.dispatch(setBookReviews(bookReviews));
    thunkapi.dispatch(setCourseReviews(courseReviews));
    thunkapi.dispatch(setLectureDetails(lectureDetails));
    thunkapi.dispatch(setCourseDocuments(courseDocuments));
    thunkapi.dispatch(setInit(true));
  }
);

export const UpdateProfile = createAsyncThunk(
  "AppSlice/updateProfile",
  async (payload: UpdateUserPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    const dataFromServer = await response.json();
    const { updatedProfile, message, error } = dataFromServer;
    error ? onError && onError(error) : onSuccess && onSuccess(message);
    updatedProfile ? thunkapi.dispatch(setUser(updatedProfile)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);

const AppSlice = createSlice({
  name: "AppSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setInit: (state, action: PayloadAction<boolean>) => {
      state.init = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.userAppLoading = action.payload;
    },
  },
});

export const { setUser, setInit, setLoading } = AppSlice.actions;
export default AppSlice.reducer;
