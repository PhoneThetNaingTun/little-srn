"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";
import { BookOrderCellAction } from "./bookOrder-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type BookOrderColumn = {
  id: string;
  title: string;
  uname: string;
  address: string;
  uemail: string;
  phone: string;
};

export const bookOrderColumns: ColumnDef<BookOrderColumn>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "uname",
    header: "Name",
  },
  {
    accessorKey: "uemail",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    id: "id",
    cell: ({ row }) => <BookOrderCellAction data={row.original} />,
    header: "action",
  },
];
