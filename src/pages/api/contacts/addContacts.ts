import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userInput = z.object({
  contactName: z.string().min(3).max(25),
  contactNumberKey: z.number().min(100000).max(999999),
  id:z.number()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

    try {
      let arr=[]
      const body = req.body;
      const parsedInput = userInput.safeParse(body);
      if (!parsedInput.success) {
        return res.status(422).json({ message: "Validation failed" });
      }
      const { contactNumberKey, contactName,id } = parsedInput.data;
      const user = await prisma.user.findFirst({ where: { id } });
      const findUserToAdd = await prisma.user.findFirst({
        where: { numberKey: contactNumberKey },
      });
      if (user && findUserToAdd) {
        let present = false;
        try {
          const existingContact = await prisma.contact.findFirst({
            where: {
              numberKey: contactNumberKey,
              addedUserId:id
            },
          });
          if (existingContact) {
            present = true;
          }
          if (!present) {
            const contact = await prisma.contact.create({
              data: {
                name: contactName,
                numberKey: contactNumberKey,
                addedUserId:user.id,
                contactUserId:findUserToAdd.id
              },
            });
            if (contact) {
              const contactUser = await prisma.contactUser.create({
                data: {
                  contactId: contact.id,
                  userId: user.id,
                },
              });
              if (contactUser) {
                const contacts = await prisma.contactUser.findMany({
                  where: {
                    userId: user?.id,
                  },
                });
                const addedChat={
                  contactId:contactUser.contactId,
                  userId:id,
                  contact:{
                    id:contact.id,
                    userId:findUserToAdd.id,
                    name:contactName,
                    numberKey:contactNumberKey
                  }
                }
                res.status(201).json({ message: "Chat Added",addedChat });
              } else {
                res.status(409).json({ message: "Failed" });
              }
            } else {
              res.status(404).json({ message: "Failed" });
            }
          }else {
            res.status(404).json({ message: "Failed" });
          }
          
        } catch (error) {
          res.status(500).json({ message: "Error" });
        }
      } else {
        res.status(500).json({ message: "Error" });
      }
    } catch {
      res.status(500).json({ message: "Error" });
    }finally{
      prisma.$disconnect()
  }
  
}
