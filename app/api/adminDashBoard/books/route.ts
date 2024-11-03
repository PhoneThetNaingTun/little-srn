"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";

export async function POST(req: Request) {
  const { title, author, pages, price, image } = await req.json();
  if (!title || !author || !pages || !price) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const newBook = await prisma.books.create({
    data: { title, author, pages, price, image },
  });
  return NextResponse.json({ message: "Book created successfully!", newBook });
}

export async function PATCH(req: NextRequest) {
  const { id, title, author, pages, price, image } = await req.json();
  const isExist = await prisma.books.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Book Doesn't Exist!" });
  }
  const updatedBook = await prisma.books.update({
    where: { id },
    data: { title, author, pages, price, image },
  });
  return NextResponse.json({
    message: "Book detail updated successfully!",
    updatedBook,
  });
}

export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.books.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Book Doesn't Exist!" });
  }
  await prisma.books.delete({ where: { id } });
  return NextResponse.json({
    message: "Book Deleted successfully!",
  });
}
