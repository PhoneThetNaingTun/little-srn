"use client";

import { ColumnDef } from "@tanstack/react-table";
import { QuestionCellAction } from "./question-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type QuestionColumn = {
  ename: string | undefined;
  questionDescription: string;
  sample: string;
  id: string;
};

export const questionColumn: ColumnDef<QuestionColumn>[] = [
  {
    accessorKey: "questionDescription",
    header: "Description",
  },
  {
    accessorKey: "sample",
    header: "Sample",
  },
  {
    accessorKey: "ename",
    header: "Exercise Name",
  },

  {
    id: "id",
    cell: ({ row }) => <QuestionCellAction data={row.original} />,
    header: "action",
  },
];
