"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CourseCellAction } from "./course-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CourseColumn = {
  id: string;
  level: string;
  stat: string;
  cName: string;
  zoom: string;
  teachYourself: string;
};

export const courseColumn: ColumnDef<CourseColumn>[] = [
  {
    accessorKey: "cName",
    header: "Corse Name",
  },
  {
    accessorKey: "level",
    header: "Level",
  },
  {
    accessorKey: "zoom",
    header: "Zoom Fee",
  },
  {
    accessorKey: "teachYourself",
    header: "Teach Yourself Fee",
  },
  {
    accessorKey: "stat",
    header: "Status",
  },

  {
    id: "id",
    cell: ({ row }) => <CourseCellAction data={row.original} />,
    header: "action",
  },
];
