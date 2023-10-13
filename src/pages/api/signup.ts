import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { signupBody } from "./types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const userInput = z.object({
  name: z.string().min(3).max(25),
  email: z.string().min(11).max(40).email(),
  password: z.string().min(8).max(25),
  numberKey: z.string().min(6).max(6),
});

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {

  const prisma = new PrismaClient();
  const body: signupBody = req.body;
  const parsedInput = userInput.safeParse(body);

  if (!parsedInput.success) {
    return res.status(422).json({ message: "Validation failed" });
  }

  const { email, name, password, numberKey } = parsedInput.data;
  const saltRounds = 10;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.findFirst({ where: { email } });

    if (user) {
      return res.status(409).json({ message: "User with this email already exists" });
    }

    const number = parseInt(numberKey, 10);

    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        numberKey: number,
      },
    });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  } finally {
    await prisma.$disconnect(); 
  }
}
