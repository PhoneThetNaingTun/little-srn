import { Messages } from "@prisma/client";

export interface messageSlice {
  messages: Messages[];
  isLoading: boolean;
  Error: Error | null;
}
