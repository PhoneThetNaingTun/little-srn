import {
  DeleteBookPayload,
  EditBookPayload,
  NewBookPayload,
  bookSlice,
} from "@/types/books";
import { Books } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bookSlice = {
  books: [],
  isLoading: false,
  Error: null,
};

export const CreateBook = createAsyncThunk(
  "BookSlice/CreateBook",
  async (payload: NewBookPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/books`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newBook, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newBook ? thunkapi.dispatch(addBook(newBook)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const EditBook = createAsyncThunk(
  "BookSlice/EditBook",
  async (payload: EditBookPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/books`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedBook, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedBook ? thunkapi.dispatch(editBook(updatedBook)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const DeleteBook = createAsyncThunk(
  "BookSlice/DeleteBook",
  async (payload: DeleteBookPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_DASHBOARD_URL}/books?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeBook(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const BookSlice = createSlice({
  name: "BookSlice",
  initialState,
  reducers: {
    setBooks: (state, action: PayloadAction<Books[]>) => {
      state.books = action.payload;
    },
    addBook: (state, action: PayloadAction<Books>) => {
      state.books = [...state.books, action.payload];
    },
    editBook: (state, action: PayloadAction<Books>) => {
      state.books = state.books.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeBook: (state, action: PayloadAction<string>) => {
      state.books = state.books.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBooks, setLoading, addBook, editBook, removeBook } =
  BookSlice.actions;
export default BookSlice.reducer;
