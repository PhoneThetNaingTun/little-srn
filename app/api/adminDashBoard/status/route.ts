"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { status } = await req.json();
  if (!status) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newStatus = await prisma.status.create({ data: { status } });
  return NextResponse.json({
    message: "New Status Created Successfully",
    newStatus,
  });
}
export async function PATCH(req: NextRequest) {
  const { status, id } = await req.json();
  if (!status) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const isExist = await prisma.status.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Status Doesn't Exist" });
  }
  const updatedStatus = await prisma.status.update({
    where: { id },
    data: { status },
  });
  return NextResponse.json({
    message: "Updated Sucessfully",
    updatedStatus,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.status.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Status Doesn't Exist!" });
  }
  await prisma.status.delete({ where: { id } });
  return NextResponse.json({
    message: "Status Deleted successfully!",
  });
}
