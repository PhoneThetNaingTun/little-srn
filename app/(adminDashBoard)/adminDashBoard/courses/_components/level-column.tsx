"use client";

import { ColumnDef } from "@tanstack/react-table";
import { LevelCellAction } from "./level-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type LevelColumn = {
  id: string;
  level: string;
};

export const levelColumn: ColumnDef<LevelColumn>[] = [
  {
    accessorKey: "level",
    header: "Level",
  },

  {
    id: "id",
    cell: ({ row }) => <LevelCellAction data={row.original} />,
    header: "action",
  },
];
