import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";


const prisma=new PrismaClient()
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const message = req.body;
     console.log(message)
        try{
      const createdMessage = await prisma.messages.create({
        data: {
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.text,
        },
      });
      res.status(200).json({ response: "success", message: createdMessage });
    }
 catch(error){
    console.log(error)
    res.status(500).json({ response: "failed", messages:[] });
  }finally{
    prisma.$disconnect()
  }

}