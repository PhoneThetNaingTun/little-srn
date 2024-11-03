"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LectureDetailCellAction } from "./lectureDetail-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LectureDetailColumn = {
  id: string;
  lectureName: string;
  lectureLink: string;
  lectureDetailName: string;
};

export const lectureDetailColumn: ColumnDef<LectureDetailColumn>[] = [
  {
    accessorKey: "lectureDetailName",
    header: "Lecture Detail Name",
  },
  {
    accessorKey: "lectureName",
    header: "Lecture Name",
  },
  {
    accessorKey: "lectureLink",
    header: "Video Link",
  },

  {
    id: "id",
    cell: ({ row }) => <LectureDetailCellAction data={row.original} />,
    header: "action",
  },
];
