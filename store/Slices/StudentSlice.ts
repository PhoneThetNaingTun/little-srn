import { studentSlice } from "@/types/student";
import { User } from "@prisma/client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: studentSlice = {
  students: [],
  isLoading: false,
  Error: null,
};
const StudentSlice = createSlice({
  name: "StudentSlice",
  initialState,
  reducers: {
    setStudents: (state, action: PayloadAction<User[]>) => {
      state.students = action.payload;
    },
  },
});

export const { setStudents } = StudentSlice.actions;
export default StudentSlice.reducer;
