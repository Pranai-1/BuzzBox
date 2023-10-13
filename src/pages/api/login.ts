import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { loginBody } from "./types";
import bcrypt from "bcrypt";

const userInput = z.object({
  email: z.string().min(11).max(40).email(),
  password: z.string().min(8).max(25)
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
  const prisma = new PrismaClient();
  const body: loginBody = req.body;
  const parsedInput = userInput.safeParse(body);
  
  if (!parsedInput.success) {
    return res.status(422).json({ message: "Validation failed" });
  }
  
  const { email, password } = parsedInput.data;
  
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          return res.status(200).json({ message: "Login success" });
        } else {
          return res.status(401).json({ message: "Login failed" });
        }
      });
    } else {
      return res.status(401).json({ message: "Login failed" });
    }
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ message: "Server error" });
  } finally {
    prisma.$disconnect();
  }
}
