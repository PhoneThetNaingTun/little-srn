"use client";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { DeleteBook, EditBook } from "@/store/Slices/BookSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EditBookPayload } from "@/types/books";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DeleteDialog } from "../../../../../../components/adminDashBoard/delete-dialog";
import { Spline } from "lucide-react";

export const BooksEditPageClient = () => {
  const param = useParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { booksId } = param;
  const { toast } = useToast();
  const [editBook, setEditBook] = useState<EditBookPayload>();
  const { books, isLoading } = useAppSelector((state) => state.Books);
  const book = books.find((item) => item.id === booksId);
  useEffect(() => {
    if (book) {
      setEditBook(book);
    }
  }, [books]);
  if (!editBook) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h1 className="font-bold text-9xl">Book not found</h1>
      </div>
    );
  }
  const handleEditBook = () => {
    if (
      !editBook.title ||
      !editBook.author ||
      !editBook.pages ||
      !editBook.price
    ) {
      return toast({ title: "Please Enter All Field", variant: "destructive" });
    }
    dispatch(
      EditBook({
        ...editBook,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/books");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };

  const handleDeleteBook = () => {
    dispatch(
      DeleteBook({
        id: editBook.id,
        onSuccess: (message) => {
          toast({ title: message, variant: "default" });
          router.push("/adminDashBoard/books");
        },
        onError: (error) => {
          toast({ title: error, variant: "destructive" });
        },
      })
    );
  };
  return (
    <div>
      <div className="flex justify-between">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tigh">
          Edit Book Details
        </h3>
        <DeleteDialog loading={isLoading} OnDelete={handleDeleteBook} />
      </div>
      <div className="flex items-center gap-5">
        <Image
          src={`/uploads/${editBook.image}`}
          alt="image"
          width={500}
          height={500}
          className="w-52 h-56"
        />
        <div className="w-1/4">
          <div className="mt-3 flex flex-col gap-2">
            <p>Title</p>
            <Input
              disabled={isLoading}
              defaultValue={editBook.title}
              onChange={(e) => {
                setEditBook({ ...editBook, title: e.target.value });
              }}
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <p>Author</p>
            <Input
              disabled={isLoading}
              defaultValue={editBook.author}
              onChange={(e) => {
                setEditBook({ ...editBook, author: e.target.value });
              }}
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <p>Pages</p>
            <Input
              disabled={isLoading}
              defaultValue={editBook.pages}
              onChange={(e) => {
                setEditBook({ ...editBook, pages: e.target.value });
              }}
            />
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <p>Price</p>
            <Input
              disabled={isLoading}
              defaultValue={editBook.price}
              onChange={(e) => {
                setEditBook({ ...editBook, price: e.target.value });
              }}
            />
          </div>
          <div className="flex justify-end">
            <Button
              disabled={isLoading}
              onClick={handleEditBook}
              className="bg-green-500 text-white  mt-3 hover:bg-green-700"
            >
              {isLoading ? (
                <Spline className="h-4 w-4 animate-spin" />
              ) : (
                "Update"
              )}{" "}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
