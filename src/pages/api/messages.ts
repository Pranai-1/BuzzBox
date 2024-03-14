import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prisma = new PrismaClient();

  try {
    if (req.method === "POST") {
      const message = req.body;
      if (typeof message.receiverId === "number") {
        const createdMessage = await prisma.messages.create({
          data: {
            senderId: message.senderId,
            receiverId: message.receiverId,
            text: message.text,
          },
        });
        res.status(200).json({ response: "success", message: createdMessage });
      } else {
        res.status(400).json({ response: "error", message: "Invalid receiver ID" });
      }
    } else if (req.method === "GET") {
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
    } else {
      res.status(405).json({ response: "error", message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ response: "error", message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
