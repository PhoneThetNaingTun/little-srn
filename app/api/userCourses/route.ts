"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, courseId } = await req.json();
  if (!userId || !courseId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const isExist = await prisma.userCourses.findFirst({
    where: { userId, courseId },
  });
  if (isExist) {
    return NextResponse.json({
      error:
        "You Alrealy Enroll This Course Please Wait For Confirmation Or Check In Your Your Courses Page",
    });
  }
  const newUserCourse = await prisma.userCourses.create({
    data: { userId, courseId },
  });
  return NextResponse.json({
    message: "Course Enrolled!",
    newUserCourse,
  });
}
export async function PATCH(req: NextRequest) {
  const { id } = await req.json();

  const isExist = await prisma.userCourses.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Enrollment Doesn't Exist" });
  }
  await prisma.userCourses.update({
    where: { id },
    data: { isConfirm: true },
  });
  return NextResponse.json({
    message: "Enrollment Confirm Sucessfully",
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.userCourses.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Enrollment Doesn't Exist!" });
  }
  await prisma.userCourses.delete({ where: { id } });
  return NextResponse.json({
    message: "Enrollment Canceled successfully!",
  });
}
