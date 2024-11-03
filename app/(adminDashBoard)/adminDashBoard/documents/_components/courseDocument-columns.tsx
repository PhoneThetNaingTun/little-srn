"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DocumentCellAction } from "./document-cellAction";
import { CourseDocumentCellAction } from "./courseDocument-cellAction";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CourseDocumentColumn = {
  id: string;
  cname: string;
  dname: string;
};

export const courseDocumentColumn: ColumnDef<CourseDocumentColumn>[] = [
  {
    accessorKey: "dname",
    header: "Document Name",
  },
  {
    accessorKey: "cname",
    header: "Course Name",
  },
  {
    id: "id",
    cell: ({ row }) => <CourseDocumentCellAction data={row.original} />,
    header: "action",
  },
];
