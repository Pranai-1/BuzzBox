import { PrismaClient } from "@prisma/client";

export default async function handler(numberKey: number) {

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
    let arr = [];
  }

  return arr;
}
