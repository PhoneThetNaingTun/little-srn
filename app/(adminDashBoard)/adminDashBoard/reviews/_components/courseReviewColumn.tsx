"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CourseReviewColumn = {
  name: string;
  email: string;
  cName: string;
  review: string;
};

export const courseReviewColumn: ColumnDef<CourseReviewColumn>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "email",
    header: "Student Email",
  },
  {
    accessorKey: "cName",
    header: "Cousere Name",
  },
  {
    accessorKey: "review",
    header: "Review",
  },
];
