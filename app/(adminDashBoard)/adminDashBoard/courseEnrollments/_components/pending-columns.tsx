"use client";

import { ColumnDef } from "@tanstack/react-table";
import { PendingCellAction } from "./pending-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type PendingColumn = {
  id: string;
  ctitle: string;
  uname: string;
  uemail: string;
  uphone: string;
};

export const pendingColumns: ColumnDef<PendingColumn>[] = [
  {
    accessorKey: "uname",
    header: "Student Name",
  },
  {
    accessorKey: "uemail",
    header: "Email",
  },
  {
    accessorKey: "uphone",
    header: "Phone Number",
  },
  {
    accessorKey: "ctitle",
    header: "Course",
  },

  {
    id: "id",
    cell: ({ row }) => <PendingCellAction data={row.original} />,
    header: "action",
  },
];
