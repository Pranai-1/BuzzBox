import { PrismaClient } from "@prisma/client";

export default async function handler(numberKey: number) {

  const prisma = new PrismaClient();
  let arr = [];
  try {
    const user = await prisma.user.findFirst({ where: { numberKey } });
    if (user && user.id) {
      const roomsOfuser = await prisma.roomUser.findMany({
        where: {
          userId: user?.id,
        },
      });

      if (roomsOfuser) {
        for (const obj of roomsOfuser) {
          const contacts = await prisma.room.findFirst({
            where: {
              id: obj.roomId,
            },
          });
          arr.push(contacts);
        }
      }
    }
  } catch(error) {
    console.log(error)
    let arr = [];
  }

  return arr;
}
