import {
  DeleteStatusPayload,
  NewStatusPayload,
  UpdateStatusPayload,
  statusSlice,
} from "@/types/status";
import { Status } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: statusSlice = {
  status: [],
  isLoading: false,
  Error: null,
};

export const CreateStatus = createAsyncThunk(
  "StausSlice/CreateStatus",
  async (payload: NewStatusPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/status`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newStatus, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newStatus ? thunkapi.dispatch(addStatus(newStatus)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditStatus = createAsyncThunk(
  "StatusSlice/EditStatus",
  async (payload: UpdateStatusPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/status`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedStatus, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedStatus ? thunkapi.dispatch(editStatus(updatedStatus)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteStatus = createAsyncThunk(
  "StatusSlice/DeleteStatus",
  async (payload: DeleteStatusPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/status?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeStatus(id));
    thunkapi.dispatch(setLoading(false));
  }
);
const StatusSlice = createSlice({
  name: "StatusSlice",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<Status[]>) => {
      state.status = action.payload;
    },
    addStatus: (state, action: PayloadAction<Status>) => {
      state.status = [...state.status, action.payload];
    },
    editStatus: (state, action: PayloadAction<Status>) => {
      state.status = state.status.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeStatus: (state, action: PayloadAction<string>) => {
      state.status = state.status.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setStatus, setLoading, addStatus, editStatus, removeStatus } =
  StatusSlice.actions;

export default StatusSlice.reducer;
