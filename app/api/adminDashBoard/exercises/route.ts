"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { ename, courseId } = await req.json();
  if (!ename || !courseId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newExercise = await prisma.exercises.create({
    data: { ename, courseId },
  });
  return NextResponse.json({
    message: "Exercise created successfully!",
    newExercise,
  });
}

export async function PATCH(req: NextRequest) {
  const { id, ename, courseId } = await req.json();
  const isExist = await prisma.exercises.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Exercise Doesn't Exist!" });
  }
  const updatedExercise = await prisma.exercises.update({
    where: { id },
    data: { ename, courseId },
  });
  return NextResponse.json({
    message: "Exercise detail updated successfully!",
    updatedExercise,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.exercises.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Exercise Doesn't Exist!" });
  }
  await prisma.exercises.delete({ where: { id } });
  return NextResponse.json({
    message: "Exercise Deleted successfully!",
  });
}
