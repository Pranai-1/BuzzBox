import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const prisma=await new PrismaClient()
    if(req.method=="POST"){
        console.log(req.body)
    const message=req.body
 
      const messages=await prisma.messages.create({
        data:{
            senderId:message.senderId,
            receiverId:message.receiverId,
            text:message.text

        }
      })
      if(messages){
        res.status(200).json({response:"success",messages})
      }
      res.status(404).json({response:"failed"})
    }else if(req.method=="GET"){
        console.log(req.headers)
       const senderId=Number(req.headers["senderid"])
       const receiverId=Number(req.headers["receiverid"])
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
          console.log(messages)
        if(messages){
            res.status(200).json({response:"success",messages})
          }
          res.status(404).json({response:"failed",messages:[]})
    }
}