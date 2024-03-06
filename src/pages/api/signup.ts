import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { SignupBody } from "./types";

const userInput = z.object({
  name: z.string().min(3).max(25),
  email: z.string().min(11).max(40).email(),
  password: z.string().min(6).max(25),
  numberKey: z.number().min(100000).max(999999),
});

export default async function Handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    const prisma = new PrismaClient();
    console.log(prisma)
    let body: any = req.body;
    let x = Number(body.numberKey);

    let signupBody: any = {
      name: body.name,
      email: body.email,
      password: body.password,
      numberKey: x,
    };

    const parsedInput = userInput.safeParse(signupBody);
 
    if (!parsedInput.success) {
      return res.status(422).json({ message: "Validation failed" });
    }

    const { email, name, password, numberKey } = parsedInput.data;
    const saltRounds = 10;
     console.log("Hello")
    try {
      console.log("hi")
      const user = await prisma.user.findFirst({ where: { email } });
      console.log(user)
      if (user) {
        return res
          .status(409)
          .json({ error: "email already exists" });
      }
      const isPresent=await prisma.user.findFirst({where:{numberKey}})
      if(isPresent)
      return res
      .status(406)
      .json({ error: "numberKey already exists" });


      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const result = await prisma.user.create({
        data: {
          name: name,
          email: email,
          password: hashedPassword,
          numberKey: numberKey,
          contacts:{},      
        },
      });
     console.log(result)
      res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Error creating user" });
    } finally {
      await prisma.$disconnect();
    }
  }


