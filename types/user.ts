import { User } from "@prisma/client";

export interface BaseOption {
  onSuccess?: (data?: any) => void;
  onError?: (data?: any) => void;
}

export interface App {
  user: User;
  adminAppLoading: boolean;
  error: Error | null;
  init: boolean;
}
export interface UserApp {
  user: User;
  userAppLoading: boolean;
  error: Error | null;
  init: boolean;
}

export interface UpdateUserPayload extends BaseOption {
  id: string;
  phone: string;
  dob: string;
}
export interface updateImagePayload extends BaseOption {
  file: File;
}
