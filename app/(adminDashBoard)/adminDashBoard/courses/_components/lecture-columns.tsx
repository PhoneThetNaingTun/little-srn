"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LectureCellAction } from "./lecture-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LectureColumn = {
  id: string;
  title: string;
  cName: string;
};

export const lectureColumn: ColumnDef<LectureColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "cName",
    header: "Corse Name",
  },
  {
    id: "id",
    cell: ({ row }) => <LectureCellAction data={row.original} />,
    header: "action",
  },
];
