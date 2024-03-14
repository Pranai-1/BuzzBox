import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient()
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const senderId = Number(req.headers.senderid);
      const receiverId = Number(req.headers.receiverid);
      console.log(senderId+" "+receiverId)
      try{
        const messages = await prisma.messages.findMany({
            where: {
              OR: [
                {
                  senderId,
                  receiverId,
                },
                {
                  senderId: receiverId,
                  receiverId: senderId,
                },
              ],
            },
          });
          
          res.status(200).json({ response: "success", messages });
      }catch(error){
        console.log(error)
        res.status(500).json({ response: "failed", messages:[] });
      }finally{
        prisma.$disconnect()
      }

}