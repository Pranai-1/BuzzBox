import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { signupBody } from "./types";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt"
import useCors from '@/pages/api/middleware';
const userInput=z.object({
    name :z.string().min(3).max(25),
    email:z.string().min(11).max(40).email(),
    password:z.string().min(8).max(25),
     numberKey:z.string().min(6).max(6)
})

export default async function Handler(req:NextApiRequest,res:NextApiResponse){
    await useCors(req, res);
    const prisma=new PrismaClient();
   const body:signupBody=await req.body;
   const parsedInput=userInput.safeParse(body)

   if (!parsedInput.success) {
    return res.status(422).json({ message: "Validation failed" });
  }
  const{email,name,password,numberKey}=parsedInput.data;
  const saltRounds=10;
  let hashedPassword="";
 bcrypt.hash(password,saltRounds,(err: any,hashedPass: string)=>{
    if(err)
    return res.status(422).json({ message: "Validation failed" });
    hashedPassword=hashedPass
  })
  const user=await prisma.user.findFirst({where:{email}})
  if(user){
    return res.status(409).json({ message: "User with this email already exists" });
  }
  const number=Number(numberKey)
  try {
    const result = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password:hashedPassword,
        numberKey:number
      }
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Error creating user" });
  }
  res.status(201).json({message:"user created successfully"});
}