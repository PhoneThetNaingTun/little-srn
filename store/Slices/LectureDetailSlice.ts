import {
  DeleteLectureDetailPayload,
  NewLectureDetailPayload,
  UpdateLectureDetailPayload,
  lectureDetailSlice,
} from "@/types/lectureDetail";
import { LectureDetails } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: lectureDetailSlice = {
  lectureDetails: [],
  isLoading: false,
  Error: null,
};

export const CreateLectureDetail = createAsyncThunk(
  "LectureDetailSlice/CreateLectureDetial",
  async (payload: NewLectureDetailPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectureDetails`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newLectureDetail, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newLectureDetail
      ? thunkapi.dispatch(addLectureDetail(newLectureDetail))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditLectureDetail = createAsyncThunk(
  "LectureDetailSlice/EditLectureDetail",
  async (payload: UpdateLectureDetailPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectureDetails`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedLectureDetail, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedLectureDetail
      ? thunkapi.dispatch(editLectureDetail(updatedLectureDetail))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteLectureDetail = createAsyncThunk(
  "LectureDetailSlice/DeleteLectureDetail",
  async (payload: DeleteLectureDetailPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/lectureDetails?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeLectureDetail(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const LectureDetailSlice = createSlice({
  name: "LectureDetailSlice",
  initialState,
  reducers: {
    setLectureDetails: (state, action: PayloadAction<LectureDetails[]>) => {
      state.lectureDetails = action.payload;
    },
    addLectureDetail: (state, action: PayloadAction<LectureDetails>) => {
      state.lectureDetails = [...state.lectureDetails, action.payload];
    },
    editLectureDetail: (state, action: PayloadAction<LectureDetails>) => {
      state.lectureDetails = state.lectureDetails.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeLectureDetail: (state, action: PayloadAction<string>) => {
      state.lectureDetails = state.lectureDetails.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setLectureDetails,
  setLoading,
  addLectureDetail,
  editLectureDetail,
  removeLectureDetail,
} = LectureDetailSlice.actions;

export default LectureDetailSlice.reducer;
