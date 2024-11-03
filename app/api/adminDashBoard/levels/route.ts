"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { level } = await req.json();
  if (!level) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newLevel = await prisma.levels.create({ data: { level } });
  return NextResponse.json({
    message: "New Level Created Successfully",
    newLevel,
  });
}
export async function PATCH(req: NextRequest) {
  const { level, id } = await req.json();
  if (!level) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const isExist = await prisma.levels.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Level Doesn't Exist" });
  }
  const updatedLevel = await prisma.levels.update({
    where: { id },
    data: { level },
  });
  return NextResponse.json({
    message: "Updated Sucessfully",
    updatedLevel,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.levels.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Level Doesn't Exist!" });
  }
  await prisma.levels.delete({ where: { id } });
  return NextResponse.json({
    message: "Level Deleted successfully!",
  });
}
