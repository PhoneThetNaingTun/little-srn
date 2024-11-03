"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookReviewColumn = {
  name: string;
  email: string;
  title: string;
  review: string;
};

export const bookReviewColumn: ColumnDef<BookReviewColumn>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
  },
  {
    accessorKey: "email",
    header: "Student Email",
  },
  {
    accessorKey: "title",
    header: "Book Title",
  },
  {
    accessorKey: "review",
    header: "Review",
  },
];
