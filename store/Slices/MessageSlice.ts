import { NewMessagesPayload, messageSlice } from "@/types/message";
import { Messages } from "@prisma/client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: messageSlice = {
  messages: [],
  isLoading: false,
  Error: null,
};
export const CreateMessage = createAsyncThunk(
  "MessageSlice/CreateMessage",
  async (payload: NewMessagesPayload, thunkapi) => {
    thunkapi.dispatch(setLoading(true));
    const { onSuccess, onError } = payload;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/messages`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const dataFromServer = await response.json();
    const { newMessage, message, error } = dataFromServer;
    message ? onSuccess && onSuccess(message) : onError && onError(error);
    newMessage ? thunkapi.dispatch(addMessage(newMessage)) : null;
    thunkapi.dispatch(setLoading(false));
  }
);
const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Messages[]>) => {
      state.messages = action.payload;
    },
    addMessage: (state, action: PayloadAction<Messages>) => {
      state.messages = [...state.messages, action.payload];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setMessages, setLoading, addMessage } = MessageSlice.actions;

export default MessageSlice.reducer;
