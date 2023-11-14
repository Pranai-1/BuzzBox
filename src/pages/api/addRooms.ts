import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

const userInput = z.object({
  roomKey: z.number().min(1).max(999999),
  id: z.number(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const body = req.body;
  const prisma = new PrismaClient();

  try {
    const { roomKey, id } = userInput.parse(body);

   
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let room = await prisma.room.findFirst({
      where: { key: roomKey },
    });

    if (!room) {
      room = await prisma.room.create({
        data: {
          key: roomKey,
        },
      });
    }

    const userIsPresentInRoom = await prisma.roomUser.findFirst({
      where: {
        userId: id,
        roomId: room.id,
      },
    });

    if (userIsPresentInRoom) {
      return res.status(409).json({ message: "User is already present in the room" });
    }

    const addUserInRoom = await prisma.roomUser.create({
      data: {
        userId: id,
        roomId: room.id,
      },
    });

    if (addUserInRoom) {
      const allRoomsOfThisUser = await prisma.roomUser.findMany({
        where: {
          userId: id,
        },
      });

      return res.status(200).json({ message: 'Success', rooms: allRoomsOfThisUser });
    } else {
      return res.status(500).json({ message: "Failed to add user to the room" });
    }
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "Bad Request" });
  } finally {
    await prisma.$disconnect();
  }
}
