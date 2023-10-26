import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse) {

 const numberKey=Number(req.headers["numberkey"])

  const prisma = new PrismaClient();
  let arr = [];
  try {
    const user = await prisma.user.findFirst({ where: { numberKey } });
    if (user && user.id) {
      const contactUser = await prisma.contactUser.findMany({
        where: {
          userId: user?.id,
        },
      });
      if (contactUser) {
        for (const obj of contactUser) {
          const contacts = await prisma.contact.findFirst({
            where: {
              id: obj.contactId,
            },
          });
          arr.push(contacts);
        }
      }
    }
  } catch(error) {
    console.log(error)
    res.status(404).json({message:"failed"})
  }finally{
    prisma.$disconnect()
}

  res.status(200).json({chats:arr})
}
