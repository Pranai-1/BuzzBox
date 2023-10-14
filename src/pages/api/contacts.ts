import { NextApiRequest, NextApiResponse } from "next";
import { addContact } from "./types";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";


const userInput = z.object({
  contactName: z.string().min(3).max(25),
    contactNumberKey: z.number().min(100000).max(999999),
    numberKey:z.number().min(100000).max(999999)
  });

  
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    
    const prisma=new PrismaClient();
    if(req.method==='POST'){
   const body:any= await req.body

   const parsedInput=userInput.safeParse(body)
   if(!parsedInput.success){
    return res.status(422).json({ message: "Validation failed" });
   }
   let{contactNumberKey,contactName,numberKey}=parsedInput.data
   try{
    const user = await prisma.user.findFirst({ where: { numberKey } });
    const findUserToAdd = await prisma.user.findFirst({ where: { numberKey: contactNumberKey } });
    if (user && findUserToAdd) {
    try{
      const contact = await prisma.contact.create({
        data: {
          name: contactName,
          numberKey: contactNumberKey,
          userId: user.id,
        },
      });
      if(contact){
        res.status(201).json({message:'Chat Added'})
      } else {
        return res.status(500).json({ message: "Failed to create chat" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Error creating chat" });
    }
  } else {
    return res.status(400).json({ message: "User not found" });
  }
} catch {
  return res.status(500).json({ message: "Error finding user" });
}
  }else if(req.method==='GET'){

  }
}