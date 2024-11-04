"use client";

import { useAppSelector } from "@/store/hooks";
import { BookCard } from "./booksCard";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export const BookPageClient = () => {
  const { books } = useAppSelector((state) => state.Books);
  const { bookOrders } = useAppSelector((state) => state.BookOrders);
  const router = useRouter();
  return (
    <div className="p-2 md:p-10 overflow-y-scroll scrollbar-thin scrollbar-thumb-violet-500 scrollbar-track-transparent">
      <div className="flex justify-between items-center">
        <p className="text-5xl text-yellow-500 font-semibold">
          Available Books
        </p>
        <Button
          className="text-white relative"
          onClick={() => {
            router.push("/books/orders");
          }}
        >
          <span className="absolute top-0 right-0 -translate-x-[50%] -translate-y-[50%] bg-red-500 text-white px-1 rounded-full">
            {bookOrders.length}
          </span>
          Your Book Orders
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 md:gap-5 gap-3 mt-3  ">
        {books.map((book) => {
          return (
            <BookCard
              header={book.title}
              image={book.image || ""}
              id={book.id}
              description={book.author}
            />
          );
        })}
      </div>
    </div>
  );
};
