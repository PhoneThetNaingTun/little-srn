"use server";
import { RegisterSchema } from "@/schemas";
import * as z from "zod";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { prisma } from "@/lib/prisma";

export const registerUser = async (value: z.infer<typeof RegisterSchema>) => {
  const isValitated = RegisterSchema.parse(value);

  if (!isValitated) {
    return { error: "Invalid Field!" };
  }
  const { name, email, password, dob, phone } = isValitated;
  const hashPassword = await bcrypt.hash(password, 10);
  const isExist = await getUserByEmail(email);
  if (isExist) {
    return { error: "Email Already Exist" };
  }
  await prisma.user.create({
    data: { name, email, password: hashPassword, dateOfBirth: dob, phone },
  });

  return { success: "Register Successful" };
};
