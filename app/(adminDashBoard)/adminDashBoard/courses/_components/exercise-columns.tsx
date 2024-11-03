"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ExerciseCellAction } from "./exercise-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ExerciseColumn = {
  id: string;
  cName: string;
  ename: string;
};

export const exerciseColumn: ColumnDef<ExerciseColumn>[] = [
  {
    accessorKey: "ename",
    header: "Exercise Name",
  },
  {
    accessorKey: "cName",
    header: "Corse Name",
  },

  {
    id: "id",
    cell: ({ row }) => <ExerciseCellAction data={row.original} />,
    header: "action",
  },
];
