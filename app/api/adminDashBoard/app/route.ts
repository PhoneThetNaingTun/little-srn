"use server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/middleware";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (session) {
    const { user } = session;
    const name = user.name as string;
    const email = user.email as string;
    const userFromDb = await prisma.user.findFirst({ where: { name, email } });
    if (userFromDb) {
      const books = await prisma.books.findMany();
      const users = await prisma.user.findMany({
        where: { role: "User" },
        orderBy: { createdDate: { sort: "desc" } },
      });
      const bookReviews = await prisma.bookReviews.findMany();
      const levels = await prisma.levels.findMany();
      const status = await prisma.status.findMany();
      const courses = await prisma.courses.findMany();
      const courseReviews = await prisma.courseReviews.findMany();
      const lectures = await prisma.lectures.findMany();
      const lectureDetails = await prisma.lectureDetails.findMany();
      const documents = await prisma.documents.findMany();
      const courseDocuments = await prisma.courseDocuments.findMany();
      const messages = await prisma.messages.findMany({
        orderBy: { createdDate: { sort: "desc" } },
      });
      const exercises = await prisma.exercises.findMany();
      const questions = await prisma.questions.findMany();
      const userCourses = await prisma.userCourses.findMany();
      const bookOrders = await prisma.boookOrders.findMany();
      return NextResponse.json({
        userFromDb,
        books,
        bookReviews,
        users,
        levels,
        status,
        courses,
        courseReviews,
        lectureDetails,
        lectures,
        documents,
        courseDocuments,
        messages,
        exercises,
        questions,
        userCourses,
        bookOrders,
      });
    } else {
      return NextResponse.json({ message: "User Doesnt Exist" });
    }
  }
}
