import { BoookOrders } from "@prisma/client";
import { BaseOption } from "./user";

export interface bookOrderSlice {
  bookOrders: BoookOrders[];
  isLoading: boolean;
  Error: Error | null;
}

export interface NewBookOrderPayload extends BaseOption {
  userId: string;
  bookId: string;
  address: string;
}
export interface ConfirmBookOrderPayload
  extends BaseOption,
    NewBookOrderPayload {
  id: string;
}
export interface DeleteBookOrderPayload extends BaseOption {
  id: string;
}
