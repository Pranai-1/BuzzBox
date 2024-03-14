// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const id=Number(req.headers["id"])
  console.log(id)
  try {
    const user = await prisma.user.findFirst({ where: { id } });
   

    if (user) {
      const contacts = await prisma.contactUser.findMany({
        where: { userId: user.id },
        include: { contact: true }
      });

      const rooms = await prisma.roomUser.findMany({
        where: { userId: user.id },
        include: { room: true }
      });

      // console.log(contacts);
      // console.log(rooms);

      res.status(200).json({ contacts, rooms });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error in API route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
}
