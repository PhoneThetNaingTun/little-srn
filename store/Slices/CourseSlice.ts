import {
  DeleteCoursePayload,
  NewCoursePayload,
  UpdateCoursePayload,
  courseSlice,
} from "@/types/courses";
import { Courses } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: courseSlice = {
  courses: [],
  isLoading: false,
  Error: null,
};
export const CreateCourse = createAsyncThunk(
  "CourseSlice/CreateCourse",
  async (payload: NewCoursePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courses`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newCourse, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newCourse ? thunkapi.dispatch(addCourse(newCourse)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditCourse = createAsyncThunk(
  "CourseSlice/EditCourse",
  async (payload: UpdateCoursePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courses`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedCourse, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedCourse ? thunkapi.dispatch(editCourse(updatedCourse)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteCourse = createAsyncThunk(
  "CourseSlice/DeleteCourse",
  async (payload: DeleteCoursePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courses?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeCourse(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const CourseSlice = createSlice({
  name: "CourseSlice",
  initialState,
  reducers: {
    setCourses: (state, action: PayloadAction<Courses[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Courses>) => {
      state.courses = [...state.courses, action.payload];
    },
    editCourse: (state, action: PayloadAction<Courses>) => {
      state.courses = state.courses.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeCourse: (state, action: PayloadAction<string>) => {
      state.courses = state.courses.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setCourses, setLoading, addCourse, editCourse, removeCourse } =
  CourseSlice.actions;

export default CourseSlice.reducer;
