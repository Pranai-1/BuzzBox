import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { signupBody } from "./types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const userInput = z.object({
  name: z.string().min(3).max(25),
  email: z.string().min(11).max(40).email(),
  password: z.string().min(8).max(25),
  numberKey: z.number().min(100000).max(999999),
});

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
  const prisma = new PrismaClient();
  let body: any = req.body;
  let x=Number(body.numberKey)
 let signupBody:signupBody={
   name: body.name,
   email: body.email,
   password:body.password,
   numberKey: x
 }

  const parsedInput = userInput.safeParse(signupBody);

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
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        numberKey: numberKey,
        contacts:{},
        messages:{}
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
res.status(407).end()
}
