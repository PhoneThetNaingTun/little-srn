import {
  DeleteQuestionPayload,
  NewQuestionPayload,
  UpdateQuestionPayload,
  questionSlice,
} from "@/types/questions";
import { Questions } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: questionSlice = {
  questions: [],
  isLoading: false,
  Error: null,
};

export const CreateQuestion = createAsyncThunk(
  "QuestionSlice/CreateQuestion",
  async (payload: NewQuestionPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/questions`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newQuestion, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newQuestion ? thunkapi.dispatch(addQuestion(newQuestion)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditQuestion = createAsyncThunk(
  "QuestionSlice/EditQuestion",
  async (payload: UpdateQuestionPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/questions`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedQuestion, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedQuestion ? thunkapi.dispatch(editQuestion(updatedQuestion)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteQuestion = createAsyncThunk(
  "QuestionSlice/DeleteQuestion",
  async (payload: DeleteQuestionPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/questions?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeQuestion(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const QuestionSlice = createSlice({
  name: "QuestionSlice",
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<Questions[]>) => {
      state.questions = action.payload;
    },
    addQuestion: (state, action: PayloadAction<Questions>) => {
      state.questions = [...state.questions, action.payload];
    },
    editQuestion: (state, action: PayloadAction<Questions>) => {
      state.questions = state.questions.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeQuestion: (state, action: PayloadAction<string>) => {
      state.questions = state.questions.filter((item) =>
        item.id === action.payload ? false : true
      );
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setQuestions,
  setLoading,
  addQuestion,
  removeQuestion,
  editQuestion,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;
