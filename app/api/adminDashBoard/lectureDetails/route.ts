"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { lectureDetailName, lectureLink, lectureId } = await req.json();
  if (!lectureDetailName || !lectureLink || !lectureId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newLectureDetail = await prisma.lectureDetails.create({
    data: { lectureDetailName, lectureLink, lectureId },
  });
  return NextResponse.json({
    message: "Lecture Detail created successfully!",
    newLectureDetail,
  });
}

export async function PATCH(req: NextRequest) {
  const { id, lectureDetailName, lectureLink, lectureId } = await req.json();
  const isExist = await prisma.lectureDetails.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Lecture Detail Doesn't Exist!" });
  }
  const updatedLectureDetail = await prisma.lectureDetails.update({
    where: { id },
    data: { lectureDetailName, lectureLink, lectureId },
  });
  return NextResponse.json({
    message: "Lecture detail updated successfully!",
    updatedLectureDetail,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.lectureDetails.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Lecture Detail Doesn't Exist!" });
  }
  await prisma.lectureDetails.delete({ where: { id } });
  return NextResponse.json({
    message: "Lecture Detail Deleted successfully!",
  });
}
