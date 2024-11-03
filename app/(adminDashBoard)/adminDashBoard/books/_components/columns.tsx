"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookColum = {
  id: string;
  title: string;
  author: string;
  pages: string;
  price: string;
};

export const columns: ColumnDef<BookColum>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "pages",
    header: "Pages",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    id: "id",
    cell: ({ row }) => <CellAction data={row.original} />,
    header: "action",
  },
];
