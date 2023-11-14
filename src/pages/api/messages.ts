import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const message = req.body;
    if(typeof message.receiverId=="number"){
    try {
      const createdMessage = await prisma.messages.create({
        data: {
          senderId: message.senderId,
          receiverId: message.receiverId,
          text: message.text,
        },
      });
      res.status(200).json({ response: "success", message: createdMessage });
    } catch (error) {
      res.status(500).json({ response: "error", error: error});
    }
  }else{
    try {
      for(const obj of message.receiverId){
      const createdMessage = await prisma.messages.create({
        data: {
          senderId: message.senderId,
          receiverId: obj.receiverId,
          text: message.text,
        },
      });
    }
      res.status(200).json({ response: "success"});
    } catch (error) {
      res.status(500).json({ response: "error", error: error});
    }
  }
  } else if (req.method === "GET") {
    try {
      const senderId = Number(req.headers.senderid);
      const receiverId = Number(req.headers.receiverid);
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
    } catch (error) {
      res.status(500).json({ response: "error", error: error });
    }finally{
      prisma.$disconnect()
  }
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
