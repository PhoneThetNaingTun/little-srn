"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, message } = await req.json();
  if (!userId || !message) {
    return NextResponse.json({ error: "Bad Request" });
  }

  const newMessage = await prisma.messages.create({
    data: { userId, message },
  });
  return NextResponse.json({
    message: "Message Given!",
    newMessage,
  });
}
