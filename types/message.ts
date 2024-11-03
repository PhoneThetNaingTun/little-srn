import { Messages } from "@prisma/client";
import { BaseOption } from "./user";

export interface messageSlice {
  messages: Messages[];
  isLoading: boolean;
  Error: Error | null;
}
export interface NewMessagesPayload extends BaseOption {
  userId: string;
  message: string;
}
