import {
  ConfirmUserCoursePayload,
  DeleteUserCousrePayload,
  NewUserCoursePayload,
  userCourseSlice,
} from "@/types/userCourse";
import { UserCourses } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: userCourseSlice = {
  userCourse: [],
  isLoading: false,
  Error: null,
};
export const CreateUserCourse = createAsyncThunk(
  "UserCourseSlice/CreateUserCourse",
  async (payload: NewUserCoursePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userCourses`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newUserCourse, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newUserCourse ? thunkapi.dispatch(addUserCourse(newUserCourse)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);

export const ConfirmUserCourse = createAsyncThunk(
  "UserCourseSlice/ConfirmUserCourse",
  async (payload: ConfirmUserCoursePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userCourses`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeUserCourse(id));
    thunkapi.dispatch(setLoading(false));
  }
);

export const DeleteUserCourse = createAsyncThunk(
  "UserCourseSlice/DeleteUserCourse",
  async (payload: DeleteUserCousrePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/userCourses?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeUserCourse(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const UserCourseSlice = createSlice({
  name: "UserCourseSlice",
  initialState,
  reducers: {
    setUserCourse: (state, action: PayloadAction<UserCourses[]>) => {
      state.userCourse = action.payload;
    },
    addUserCourse: (state, action: PayloadAction<UserCourses>) => {
      state.userCourse = [...state.userCourse, action.payload];
    },

    removeUserCourse: (state, action: PayloadAction<string>) => {
      state.userCourse = state.userCourse.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading, setUserCourse, addUserCourse, removeUserCourse } =
  UserCourseSlice.actions;

export default UserCourseSlice.reducer;
