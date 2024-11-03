"use client";

import { useAppSelector } from "@/store/hooks";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { bookReviewColumn } from "./bookReviewColumns";
import { courseReviewColumn } from "./courseReviewColumn";
import { BookA, BookCheck } from "lucide-react";

export const ReviewsPageClient = () => {
  const { books } = useAppSelector((state) => state.Books);
  const { bookReviews } = useAppSelector((state) => state.BookReview);
  const { students } = useAppSelector((state) => state.Students);
  const { courses } = useAppSelector((state) => state.Courses);
  const { courseReviews } = useAppSelector((state) => state.CourseReviews);
  const courseReviewData = courseReviews.map((item) => {
    const name = students.find((student) => student.id === item.userId)?.name;
    const email = students.find((student) => student.id === item.userId)?.email;
    const cName = courses.find((cour) => cour.id === item.courseId)?.cName;
    const review = item.review;
    return { name, email, cName, review };
  });
  const bookReviewData = bookReviews.map((item) => {
    const title = books.find((book) => book.id === item.bookId)?.title;
    const name = students.find((student) => student.id === item.userId)?.name;
    const email = students.find((student) => student.id === item.userId)?.email;
    const review = item.review;
    return { name, email, title, review };
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <Card>
        <CardHeader>
          <p className="font-semibold text-3xl font-roboto flex gap-2 items-center">
            <BookCheck /> Course Reviews ({courseReviews.length})
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            //@ts-ignore
            columns={courseReviewColumn}
            data={courseReviewData}
            filterKey="cName"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <p className="font-semibold text-3xl font-roboto flex items-center gap-2">
            <BookA /> Book Reviews ({bookReviews.length})
          </p>
        </CardHeader>
        <CardContent>
          <DataTable
            //@ts-ignore
            columns={bookReviewColumn}
            data={bookReviewData}
            filterKey="title"
          />
        </CardContent>
      </Card>
    </div>
  );
};
