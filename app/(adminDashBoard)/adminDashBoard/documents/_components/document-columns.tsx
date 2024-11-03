"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentCellAction } from "./document-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DocumentColumn = {
  id: string;
  dname: string;
  dlink: string;
};

export const documentColumn: ColumnDef<DocumentColumn>[] = [
  {
    accessorKey: "dname",
    header: "Document Name",
  },
  {
    accessorKey: "dlink",
    header: "Document Link",
  },
  {
    id: "id",
    cell: ({ row }) => <DocumentCellAction data={row.original} />,
    header: "action",
  },
];
