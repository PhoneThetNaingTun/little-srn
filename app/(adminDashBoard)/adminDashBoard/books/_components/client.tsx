"use client";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./columns";
import { NewBookDialog } from "./NewBookDialog";
import { useAppSelector } from "@/store/hooks";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { BookA } from "lucide-react";
import { bookOrderColumns } from "./bookOrder-columns";

export const BooksClientPage = () => {
  const { books } = useAppSelector((state) => state.Books);
  const { bookOrders } = useAppSelector((state) => state.BookOrders);
  const { students } = useAppSelector((state) => state.Students);
  const bookOrderData = bookOrders.map((item) => {
    const uname = students.find((stu) => stu.id === item.userId)?.name;
    const uemail = students.find((stu) => stu.id === item.userId)?.email;
    const title = books.find((book) => item.bookId === book.id)?.title;
    const address = item.address;
    const phone = students.find((stu) => stu.id === item.userId)?.phone;
    const id = item.id;
    return { id, title, uemail, uname, address, phone };
  });
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
      <Card>
        <CardHeader>
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <BookA /> Books Orders ({bookOrders.length})
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            //@ts-ignore
            columns={bookOrderColumns}
            data={bookOrderData}
            filterKey="title"
          />
        </CardContent>
      </Card>
    </div>
  );
};
