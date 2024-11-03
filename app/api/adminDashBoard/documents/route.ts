"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

export async function POST(req: Request) {
  const { dname, dlink } = await req.json();
  if (!dname || !dlink) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newDocument = await prisma.documents.create({
    data: { dname, dlink },
  });
  return NextResponse.json({
    message: "Document created successfully!",
    newDocument,
  });
}

export async function PATCH(req: NextRequest) {
  const { id, dname, dlink } = await req.json();
  const isExist = await prisma.documents.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Document Doesn't Exist!" });
  }
  const updatedDocument = await prisma.documents.update({
    where: { id },
    data: { dname, dlink },
  });
  return NextResponse.json({
    message: "Document detail updated successfully!",
    updatedDocument,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.documents.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Document Doesn't Exist!" });
  }
  await prisma.documents.delete({ where: { id } });
  return NextResponse.json({
    message: "Document Deleted successfully!",
  });
}
