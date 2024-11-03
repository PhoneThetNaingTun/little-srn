"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { NewBookDialog } from "./NewBookDialog";
import { useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookA } from "lucide-react";

export const BooksClientPage = () => {
  const { books } = useAppSelector((state) => state.Books);

  return (
    <div>
      <Card>
        <CardHeader>
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <BookA /> Books ({books.length})
          </p>
        </CardHeader>
        <CardContent>
          <div className="flex justify-end">
            <NewBookDialog />
          </div>
          <DataTable columns={columns} data={books} filterKey="title" />
        </CardContent>
      </Card>

      <Separator className="my-5" />
    </div>
  );
};
