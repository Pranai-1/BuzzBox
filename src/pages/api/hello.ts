// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const prisma=new PrismaClient()
  const user = await prisma.user.findFirst({ where: { id:7 } });
  const user1 = await prisma.user.findFirst({
    where: { email:"pranai@gmail.com" },
    include: {
      contacts: {
       where:{userId:7},
       include:{contact:true}
      },
    },
  });
 // console.log(user1?.contacts[0].contact)
  if(user){
  const contacts = await prisma.contactUser.findMany({
    where: { userId: user.id },
    include: { contact: true }
  });
  const rooms = await prisma.roomUser.findMany({
    where: { userId: user.id },
    include: { room: true }
  });
  console.log(contacts)
  console.log(rooms)
  res.status(200).json({contacts,rooms});
}
res.status(200).json({ name: "John Doe",user });
  
}
