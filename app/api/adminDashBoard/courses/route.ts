"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
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
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    isExist.image as string
  );
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      await prisma.courses.delete({ where: { id } });
      return NextResponse.json({
        message: "Course Deleted successfully!",
      });
    } else {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting file:", error);
    return NextResponse.json(
      { error: "Failed to delete file" },
      { status: 500 }
    );
  }
}
