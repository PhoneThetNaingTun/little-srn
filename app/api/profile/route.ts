"use server";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req: Request) {
  const { id, phone, dob } = await req.json();
  const isExist = await prisma.user.findFirst({ where: { id: id } });
  if (!isExist) {
    return NextResponse.json({ error: "User Does'nt Exist" });
  }
  const updatedProfile = await prisma.user.update({
    where: { id: id },
    data: { phone, dateOfBirth: dob },
  });
  return NextResponse.json({
    message: "Profile Updated Successfully",
    updatedProfile,
  });
}
