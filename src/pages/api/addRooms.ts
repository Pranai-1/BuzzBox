import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import {z} from "zod"


const userInput = z.object({
    roomKey: z.number().min(1).max(999999),
    id:z.number()
  });

export default async function handler(
    req:NextApiRequest,
    res:NextApiResponse
){
    const body=req.body;
    const parsedInput = userInput.safeParse(body);
    if (!parsedInput.success) {
      return res.status(422).json({ message: "Validation failed" });
    }
    const { roomKey,id } = parsedInput.data;
    const prisma=new PrismaClient();
    try{  
        const user = await prisma.user.findFirst({ where: { id } });
        if(user){
           
        }else{
            res.status(404).json({message:"Invalid"})
        }
    }catch(error){
     console.log(error)
     res.status(404).json({message:"Invalid"})
    }finally{
        prisma.$disconnect()
    }
}