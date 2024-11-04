import { App, UpdateUserPayload, updateImagePayload } from "@/types/user";
import { User } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setBooks } from "./BookSlice";
import { setBookReviews } from "./BookReviewSlice";
import { setStudents } from "./StudentSlice";
import { setLevels } from "./LevelSlice";
import { setStatus } from "./StatusSlice";
import { setCourses } from "./CourseSlice";
import { setCourseReviews } from "./CourseReviewSlice";
import { setLectures } from "./LectureSlice";
import { setLectureDetails } from "./LectureDetailSlice";
import { setDocument } from "./DocumentSlice";
import { setCourseDocuments } from "./CourseDocumentSlice";
import { setMessages } from "./MessageSlice";
import { setExercise } from "./ExerciseSlice";
import { setQuestions } from "./QuestionSlice";
import { setUserCourse } from "./UserCourseSlice";
import { setBookOrders } from "./BookOrderSlice";

const initialState: App = {
  user: {
    name: "",
    id: "",
    email: "",
    emailVerified: null,
    image: "",
    phone: "",
    dateOfBirth: "",
    password: "",
    createdDate: null,
    role: null,
  },
  adminAppLoading: false,
  error: null,
  init: false,
};

export const adminFetchApp = createAsyncThunk(
  "UserSlice/fetchApp",
  async (_, thunkapi) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/app`,
      {
        method: "GET",
      }
    );
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
      bookOrders,
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
    thunkapi.dispatch(setBookOrders(bookOrders));
    thunkapi.dispatch(setCourseReviews(courseReviews));
    thunkapi.dispatch(setLectureDetails(lectureDetails));
    thunkapi.dispatch(setCourseDocuments(courseDocuments));
    thunkapi.dispatch(setInit(true));
  }
);

export const uploadAsset = createAsyncThunk(
  "app/uploadAsset",
  async (payload: updateImagePayload, thunkApi) => {
    thunkApi.dispatch(setLoading(true));
    const { file, onSuccess, onError } = payload;
    const formData = new FormData();
    formData.append("file", file);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/asset`,
      {
        method: "POST",
        body: formData,
      }
    );
    const dataFromServer = await response.json();
    const { imageName, message, error } = dataFromServer;
    error ? onError && onError(error) : onSuccess && onSuccess(imageName);
    thunkApi.dispatch(setLoading(false));
  }
);

const AdminDashBoardSlice = createSlice({
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
      state.adminAppLoading = action.payload;
    },
  },
});

export const { setUser, setInit, setLoading } = AdminDashBoardSlice.actions;
export default AdminDashBoardSlice.reducer;
