import { User } from "@prisma/client";

export interface studentSlice {
  students: User[];
  isLoading: boolean;
  Error: Error | null;
}
