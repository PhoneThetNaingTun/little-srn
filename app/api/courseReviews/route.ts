"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { courseId, userId, review } = await req.json();
  if (!userId || !courseId || !review) {
    return NextResponse.json({ error: "Bad Request" });
  }

  const newCourseReview = await prisma.courseReviews.create({
    data: { userId, courseId, review },
  });
  return NextResponse.json({
    message: "Review Given!",
    newCourseReview,
  });
}
