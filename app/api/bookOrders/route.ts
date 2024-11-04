"use server";

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userId, bookId, address } = await req.json();
  if (!userId || !bookId || !address) {
    return NextResponse.json({ error: "Bad Request" });
  }
  const isExist = await prisma.boookOrders.findFirst({
    where: { userId, bookId },
  });
  if (isExist) {
    return NextResponse.json({
      error: "You Have Already Order This Book",
    });
  }
  const newBookOrder = await prisma.boookOrders.create({
    data: { userId, bookId, address },
  });
  return NextResponse.json({
    message: "Ordered",
    newBookOrder,
  });
}
export async function PATCH(req: Request) {
  const { id } = await req.json();

  const isExist = await prisma.boookOrders.findFirst({
    where: { id },
  });
  if (!isExist) {
    return NextResponse.json({
      error: "Order Not Found!",
    });
  }
  const updatedBookOrder = await prisma.boookOrders.update({
    where: { id },
    data: { orderConfirm: true },
  });
  return NextResponse.json({
    message: "Order Confirmed",
    updatedBookOrder,
  });
}
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get("id") as string;
  const isExist = await prisma.boookOrders.findFirst({ where: { id } });
  if (!isExist) {
    return NextResponse.json({ error: "Order Doesn't Exist!" });
  }
  await prisma.boookOrders.delete({ where: { id } });
  return NextResponse.json({
    message: "Order Canceled successfully!",
  });
}
