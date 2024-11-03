"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { courseId, documentId } = await req.json();
  if (!courseId || !documentId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newCourseDocument = await prisma.courseDocuments.create({
    data: { courseId, documentId },
  });
  return NextResponse.json({
    message: "Course Document created successfully!",
    newCourseDocument,
  });
}

export async function PATCH(req: NextRequest) {
  const { id, courseId, documentId } = await req.json();
  const isExist = await prisma.courseDocuments.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Course Document Doesn't Exist!" });
  }
  const updatedCourseDocument = await prisma.courseDocuments.update({
    where: { id },
    data: { courseId, documentId },
  });
  return NextResponse.json({
    message: "Course Document detail updated successfully!",
    updatedCourseDocument,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.courseDocuments.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Course Document Doesn't Exist!" });
  }
  await prisma.courseDocuments.delete({ where: { id } });
  return NextResponse.json({
    message: "Course Document Deleted successfully!",
  });
}
