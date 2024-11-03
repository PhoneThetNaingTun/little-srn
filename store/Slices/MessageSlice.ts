import { messageSlice } from "@/types/message";
import { Messages } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: messageSlice = {
  messages: [],
  isLoading: false,
  Error: null,
};

const MessageSlice = createSlice({
  name: "MessageSlice",
  initialState,
  reducers: {
    setMessages: (state, action: PayloadAction<Messages[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = MessageSlice.actions;

export default MessageSlice.reducer;
