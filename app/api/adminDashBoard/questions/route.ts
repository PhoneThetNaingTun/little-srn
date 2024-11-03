"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { questionDescription, sample, questionImage, exerciseId } =
    await req.json();
  if (!questionDescription || !sample || !exerciseId) {
    return NextResponse.json({ error: "Bad Request" });
  }

  const newQuestion = await prisma.questions.create({
    data: { questionDescription, sample, questionImage, exerciseId },
  });
  return NextResponse.json({
    message: "New Question Created Successfully",
    newQuestion,
  });
}
export async function PATCH(req: NextRequest) {
  const { id, questionDescription, sample, exerciseId } = await req.json();
  if (!questionDescription || !sample || !exerciseId) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const isExist = await prisma.questions.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Question Doesn't Exist" });
  }
  const updatedQuestion = await prisma.questions.update({
    where: { id },
    data: { questionDescription, sample, exerciseId },
  });
  return NextResponse.json({
    message: "Updated Sucessfully",
    updatedQuestion,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.questions.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Question Doesn't Exist!" });
  }
  await prisma.questions.delete({ where: { id } });
  return NextResponse.json({
    message: "Question Deleted successfully!",
  });
}
