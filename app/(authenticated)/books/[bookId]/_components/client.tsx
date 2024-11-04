"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/hooks";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ConfirmDialog } from "./ConfirmDialog";
import { ReviewDialog } from "./ReviewDialog";
export const BookDetailPageClient = () => {
  const param = useParams();
  const { bookId } = param;
  const { books } = useAppSelector((state) => state.Books);
  const { bookReviews } = useAppSelector((state) => state.BookReview);
  const { students } = useAppSelector((state) => state.Students);
  const book = books.find((item) => item.id === bookId);
  const bookReview = bookReviews.filter((item) => item.bookId === bookId);
  const Reviews = bookReview.map((item) => {
    const studentName = students.find((stu) => stu.id === item.userId)?.name;
    const studentEmail = students.find((stu) => stu.id === item.userId)?.email;
    const studentImage = students.find((stu) => stu.id === item.userId)?.image;
    const review = item.review;
    return { review, studentName, studentEmail, studentImage };
  });
  return (
    <div className="p-2 md:p-10 overflow-y-scroll">
      <Card className="relative ">
        <CardHeader>
          <div>
            <p className="text-2xl font-bold">Title:{book?.title}</p>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row lg:items-start gap-5">
          <div>
            <Image
              src={`/uploads/${book?.image}` || ""}
              width={300}
              height={400}
              alt="bookimage"
            />
          </div>
          <div>
            <div className="relative">
              <p className="text-5xl font-semibold pl-3">{book?.title}</p>
              <div className="absolute w-2 h-full bg-violet-500 top-0 left-0"></div>
            </div>
            <p className="mt-5 font-semibold text-xl">
              Author: <span className="text-gray-600">{book?.author}</span>
            </p>
            <p className="mt-5 font-semibold">
              Pages:<span className="text-gray-600"> {book?.pages}</span>
            </p>
            <p className="mt-5 font-semibold">
              Price: <span className="text-gray-600"> {book?.price}</span>
            </p>{" "}
          </div>
          <div className="absolute top-5 right-5">
            <ReviewDialog />
          </div>
          <div className="absolute bottom-5 right-5">
            <ConfirmDialog
              bname={book?.title as string}
              bId={book?.id as string}
            />
          </div>
        </CardContent>
      </Card>
      <div className="mt-5 pb-10">
        <p className="mb-3">
          <span className="text-3xl bg-gradient-to-r from-yellow-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
            {book?.title}
          </span>
          <br />
          <span className="font-light text-xl"> Reviews</span>
        </p>
        {bookReview.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Reviews.map((item) => {
              return (
                <Card className="rounded-md shadow-lg">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      {" "}
                      <Avatar>
                        <AvatarImage src={item?.studentImage || ""} />
                        <AvatarFallback>{item?.studentName}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{item?.studentName}</p>
                        <p>{item?.studentEmail}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p>{item?.review}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div>
            <p className="text-center font-semibold text-xl">No Review Yet</p>
          </div>
        )}
      </div>
    </div>
  );
};
