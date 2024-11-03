"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, courseId } = await req.json();
  if (!title || !courseId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newLecture = await prisma.lectures.create({
    data: { title, courseId },
  });
  return NextResponse.json({
    message: "Lecture created successfully!",
    newLecture,
  });
}

export async function PATCH(req: NextRequest) {
  const { id, title, courseId } = await req.json();
  const isExist = await prisma.lectures.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Lecture Doesn't Exist!" });
  }
  const updatedLecture = await prisma.lectures.update({
    where: { id },
    data: { title, courseId },
  });
  return NextResponse.json({
    message: "Lecture detail updated successfully!",
    updatedLecture,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.lectures.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Lecture Doesn't Exist!" });
  }
  await prisma.lectures.delete({ where: { id } });
  return NextResponse.json({
    message: "Lecture Deleted successfully!",
  });
}
