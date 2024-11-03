import {
  DeleteCourseDocumentPayload,
  NewCourseDocumentPayload,
  UpdateCourseDocumentPayload,
  courseDocumentSlice,
} from "@/types/courseDocuments";
import { CourseDocuments } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: courseDocumentSlice = {
  courseDocuments: [],
  isLoading: false,
  Error: null,
};
export const CreateCourseDocument = createAsyncThunk(
  "CourseDocument/CreateCourseDocument",
  async (payload: NewCourseDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courseDocuments`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newCourseDocument, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newCourseDocument
      ? thunkapi.dispatch(addCourseDocument(newCourseDocument))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditCourseDocument = createAsyncThunk(
  "CourseDocument/EditCourseDocument",
  async (payload: UpdateCourseDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courseDocuments`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedCourseDocument, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedCourseDocument
      ? thunkapi.dispatch(editCourseDocument(updatedCourseDocument))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteCourseDocument = createAsyncThunk(
  "CourseDocument/DeleteCourseDocument",
  async (payload: DeleteCourseDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/courseDocuments?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeCourseDocument(id));
    thunkapi.dispatch(setLoading(false));
  }
);
const CourseDocumentSlcie = createSlice({
  name: "CourseDocumentSlcie",
  initialState,
  reducers: {
    setCourseDocuments: (state, action: PayloadAction<CourseDocuments[]>) => {
      state.courseDocuments = action.payload;
    },
    addCourseDocument: (state, action: PayloadAction<CourseDocuments>) => {
      state.courseDocuments = [...state.courseDocuments, action.payload];
    },
    editCourseDocument: (state, action: PayloadAction<CourseDocuments>) => {
      state.courseDocuments = state.courseDocuments.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeCourseDocument: (state, action: PayloadAction<string>) => {
      state.courseDocuments = state.courseDocuments.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setCourseDocuments,
  setLoading,
  addCourseDocument,
  removeCourseDocument,
  editCourseDocument,
} = CourseDocumentSlcie.actions;

export default CourseDocumentSlcie.reducer;
