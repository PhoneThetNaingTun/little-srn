import {
  DeleteLevelPayload,
  NewLevelPayload,
  UpdateLevelPayload,
  levelSlice,
} from "@/types/level";
import { Levels } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: levelSlice = {
  levels: [],
  isLoading: false,
  Error: null,
};

export const CreateLevel = createAsyncThunk(
  "LevelSlice/CreateLevel",
  async (payload: NewLevelPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/levels`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newLevel, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newLevel ? thunkapi.dispatch(addLevel(newLevel)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditLevel = createAsyncThunk(
  "LevelSlice/EditLevel",
  async (payload: UpdateLevelPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/levels`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedLevel, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedLevel ? thunkapi.dispatch(editLevel(updatedLevel)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteLevel = createAsyncThunk(
  "LevelSlice/DeleteLevel",
  async (payload: DeleteLevelPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/levels?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeLevel(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const LevelSlice = createSlice({
  name: "LevelSlice",
  initialState,
  reducers: {
    setLevels: (state, action: PayloadAction<Levels[]>) => {
      state.levels = action.payload;
    },
    addLevel: (state, action: PayloadAction<Levels>) => {
      state.levels = [...state.levels, action.payload];
    },
    editLevel: (state, action: PayloadAction<Levels>) => {
      state.levels = state.levels.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeLevel: (state, action: PayloadAction<string>) => {
      state.levels = state.levels.filter((item) =>
        item.id === action.payload ? false : true
      );
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLevels, setLoading, addLevel, editLevel, removeLevel } =
  LevelSlice.actions;

export default LevelSlice.reducer;
