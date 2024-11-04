"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, bookId, review } = await req.json();
  if (!userId || !bookId || !review) {
    return NextResponse.json({ error: "Bad Request" });
  }

  const newBookReview = await prisma.bookReviews.create({
    data: { userId, bookId, review },
  });
  return NextResponse.json({
    message: "Review Given!",
    newBookReview,
  });
}
