"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StatusCellAction } from "./status-CellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type StatusColumn = {
  id: string;
  status: string;
};

export const statusColumn: ColumnDef<StatusColumn>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },

  {
    id: "id",
    cell: ({ row }) => <StatusCellAction data={row.original} />,
    header: "action",
  },
];
