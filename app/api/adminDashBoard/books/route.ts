"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { string } from "zod";
import fs from "fs";
import path from "path";
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
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    isExist.image as string
  );
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath); // Delete the file
      await prisma.books.delete({ where: { id } });
      return NextResponse.json({
        message: "Book Deleted successfully!",
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
