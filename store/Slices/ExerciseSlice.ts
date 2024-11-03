import {
  DeleteExercisePayload,
  NewExercisePayload,
  UpdateExercisePayload,
  exerciseSlice,
} from "@/types/exercise";
import { Exercises } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: exerciseSlice = {
  exercises: [],
  isLoading: false,
  Error: null,
};
export const CreateExercise = createAsyncThunk(
  "ExerciseSlice/CreateExercise",
  async (payload: NewExercisePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/exercises`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newExercise, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newExercise ? thunkapi.dispatch(addExercise(newExercise)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditExercise = createAsyncThunk(
  "ExerciseSlice/EditExercise",
  async (payload: UpdateExercisePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/exercises`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedExercise, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedExercise ? thunkapi.dispatch(editExercise(updatedExercise)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteExercise = createAsyncThunk(
  "ExerciseSlice/DeleteExercise",
  async (payload: DeleteExercisePayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/exercises?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeExercise(id));
    thunkapi.dispatch(setLoading(false));
  }
);
const ExerciseSlice = createSlice({
  name: "ExerciseSlice",
  initialState,
  reducers: {
    setExercise: (state, action: PayloadAction<Exercises[]>) => {
      state.exercises = action.payload;
    },
    addExercise: (state, action: PayloadAction<Exercises>) => {
      state.exercises = [...state.exercises, action.payload];
    },
    editExercise: (state, action: PayloadAction<Exercises>) => {
      state.exercises = state.exercises.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setExercise,
  setLoading,
  addExercise,
  editExercise,
  removeExercise,
} = ExerciseSlice.actions;

export default ExerciseSlice.reducer;
