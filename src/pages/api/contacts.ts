import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(req:NextApiRequest,res:NextApiResponse) {

 const id=Number(req.headers["id"])
  console.log(id +"   "+ typeof id)

  let arr = [];
  try {
    const user = await prisma.user.findFirst({ where: { id } });
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
