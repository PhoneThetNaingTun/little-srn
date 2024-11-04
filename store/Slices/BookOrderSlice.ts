import {
  ConfirmBookOrderPayload,
  DeleteBookOrderPayload,
  NewBookOrderPayload,
  bookOrderSlice,
} from "@/types/bookOrders";
import { BoookOrders } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: bookOrderSlice = {
  bookOrders: [],
  isLoading: false,
  Error: null,
};
export const CreateBookOrder = createAsyncThunk(
  "BookOrderSlice/CreateBookOrder",
  async (payload: NewBookOrderPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookOrders`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newBookOrder, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newBookOrder ? thunkapi.dispatch(addBookOrder(newBookOrder)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
export const ConfirmBookOrder = createAsyncThunk(
  "BookOrderSlice/ConfirmBookOrder",
  async (payload: ConfirmBookOrderPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookOrders`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { updatedBookOrder, message, error } = dataFromServer;

    message ? onSuccess && onSuccess(message) : onError && onError(error);
    updatedBookOrder
      ? thunkapi.dispatch(editBookOrder(updatedBookOrder))
      : null;
    thunkapi.dispatch(setLoading(false));
  }
);

export const CancleBookOrder = createAsyncThunk(
  "BookOrderSlice/CancleBookOrder",
  async (payload: DeleteBookOrderPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError, id } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/bookOrders?id=${id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    const dataFromServer = await response.json();
    const { message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    thunkapi.dispatch(removeBookOrder(id));
    thunkapi.dispatch(setLoading(false));
  }
);

const BookOrderSlice = createSlice({
  name: "BookOrderSlice",
  initialState,
  reducers: {
    setBookOrders: (state, action: PayloadAction<BoookOrders[]>) => {
      state.bookOrders = action.payload;
    },
    addBookOrder: (state, action: PayloadAction<BoookOrders>) => {
      state.bookOrders = [...state.bookOrders, action.payload];
    },
    editBookOrder: (state, action: PayloadAction<BoookOrders>) => {
      state.bookOrders = state.bookOrders.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    removeBookOrder: (state, action: PayloadAction<string>) => {
      state.bookOrders = state.bookOrders.filter((item) =>
        item.id === action.payload ? false : true
      );
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setBookOrders,
  addBookOrder,
  removeBookOrder,
  setLoading,
  editBookOrder,
} = BookOrderSlice.actions;

export default BookOrderSlice.reducer;
