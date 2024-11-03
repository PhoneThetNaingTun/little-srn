import {
  DeleteDocumentPayload,
  NewDocumentPayload,
  UpdateDocumentPayload,
  documentSlice,
} from "@/types/documents";
import { Documents } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: documentSlice = {
  documents: [],
  isLoading: false,
  Error: null,
};

export const CreateDocument = createAsyncThunk(
  "DocumentSlice/CreateDocument",
  async (payload: NewDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/documents`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newDocument, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newDocument ? thunkapi.dispatch(addDocument(newDocument)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditDocument = createAsyncThunk(
  "DocumentSlice/EditDocument",
  async (payload: UpdateDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/documents`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedDocument, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedDocument ? thunkapi.dispatch(editDocument(updatedDocument)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteDocument = createAsyncThunk(
  "DocumentSlice/DeleteDocument",
  async (payload: DeleteDocumentPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/documents?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeDocument(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const DocumentSlice = createSlice({
  name: "DocumentSlice",
  initialState,
  reducers: {
    setDocument: (state, action: PayloadAction<Documents[]>) => {
      state.documents = action.payload;
    },
    addDocument: (state, action: PayloadAction<Documents>) => {
      state.documents = [...state.documents, action.payload];
    },
    editDocument: (state, action: PayloadAction<Documents>) => {
      state.documents = state.documents.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeDocument: (state, action: PayloadAction<string>) => {
      state.documents = state.documents.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setDocument,
  setLoading,
  addDocument,
  removeDocument,
  editDocument,
} = DocumentSlice.actions;

export default DocumentSlice.reducer;
