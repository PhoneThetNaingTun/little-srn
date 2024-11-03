"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

export async function POST(req: NextRequest) {
  const {
    levelId,
    statusId,
    cName,
    image,
    video,
    videoLabel,
    cHour,
    cPractice,
    zoomFee,
    teachYourSelfField,
    description,
  } = await req.json();
  if (
    !cName ||
    !cHour ||
    !video ||
    !videoLabel ||
    !cPractice ||
    !zoomFee ||
    !teachYourSelfField ||
    !levelId ||
    !statusId ||
    !description
  ) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newCourse = await prisma.courses.create({
    data: {
      levelId,
      statusId,
      cName,
      image,
      video,
      videoLabel,
      cHour,
      cPractice,
      zoomFee,
      teachYourSelfField,
      description,
    },
  });
  return NextResponse.json({
    message: "Course created successfully!",
    newCourse,
  });
}

export async function PATCH(req: NextRequest) {
  const {
    id,
    levelId,
    statusId,
    cName,
    image,
    video,
    videoLabel,
    cHour,
    cPractice,
    zoomFee,
    teachYourSelfField,
    description,
  } = await req.json();
  const isExist = await prisma.courses.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Course Doesn't Exist!" });
  }
  const updatedCourse = await prisma.courses.update({
    where: { id },
    data: {
      levelId,
      statusId,
      cName,
      image,
      video,
      videoLabel,
      cHour,
      cPractice,
      zoomFee,
      teachYourSelfField,
      description,
    },
  });
  return NextResponse.json({
    message: "Course detail updated successfully!",
    updatedCourse,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.courses.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Course Doesn't Exist!" });
  }
  await prisma.courses.delete({ where: { id } });
  return NextResponse.json({
    message: "Course Deleted successfully!",
  });
}
