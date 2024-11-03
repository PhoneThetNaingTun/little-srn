import {
  DeleteLecturePayload,
  NewLecturePayload,
  UpdateLecturePayload,
  lectureSlice,
} from "@/types/lectrues";
import { Lectures } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { boolean } from "zod";

const initialState: lectureSlice = {
  lectures: [],
  isLoading: false,
  Error: null,
};

export const CreateLecture = createAsyncThunk(
  "LectureSlice/CreateLecture",
  async (payload: NewLecturePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectures`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newLecture, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newLecture ? thunkapi.dispatch(addLecture(newLecture)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditLecture = createAsyncThunk(
  "LectureSlice/EditLecture",
  async (payload: UpdateLecturePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectures`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedLecture, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedLecture ? thunkapi.dispatch(editLecture(updatedLecture)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteLecture = createAsyncThunk(
  "LectureSlice/DeleteLecture",
  async (payload: DeleteLecturePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectures?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeLecture(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const LectureSlice = createSlice({
  name: "LectureSlice",
  initialState,
  reducers: {
    setLectures: (state, action: PayloadAction<Lectures[]>) => {
      state.lectures = action.payload;
    },
    addLecture: (state, action: PayloadAction<Lectures>) => {
      state.lectures = [...state.lectures, action.payload];
    },
    editLecture: (state, action: PayloadAction<Lectures>) => {
      state.lectures = state.lectures.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeLecture: (state, action: PayloadAction<string>) => {
      state.lectures = state.lectures.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setLectures,
  setLoading,
  addLecture,
  editLecture,
  removeLecture,
} = LectureSlice.actions;

export default LectureSlice.reducer;
