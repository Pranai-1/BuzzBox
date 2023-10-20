import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const userInput = z.object({
  contactName: z.string().min(3).max(25),
  contactNumberKey: z.number().min(100000).max(999999),
  numberKey: z.number().min(100000).max(999999),
  id:z.number()
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    try {
      const body = req.body;
      const parsedInput = userInput.safeParse(body);
      if (!parsedInput.success) {
        return res.status(422).json({ message: "Validation failed" });
      }
      const { contactNumberKey, contactName, numberKey,id } = parsedInput.data;
      const user = await prisma.user.findFirst({ where: { numberKey } });
      const findUserToAdd = await prisma.user.findFirst({
        where: { numberKey: contactNumberKey },
      });
      if (user && findUserToAdd) {
        let present = false;
        try {
          const existingContact = await prisma.contact.findFirst({
            where: {
              numberKey: contactNumberKey,
              userId:id
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
                userId:id
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
                res.status(201).json({ message: "Chat Added" });
              } else {
                res.status(409).json({ message: "Failed" });
              }
            } else {
              res.status(404).json({ message: "Failed" });
            }
          }
          // } else {
          //   try {
          //     const alreadyInList = await prisma.contactUser.findFirst({
          //       where: {
          //         contactId: existingContact?.id,
          //         userId: user.id,
          //       },
          //     });
          //    if (alreadyInList) {
          //       res.status(412).json({ message: "Failed" });
          //     } else {
          //       await prisma.contactUser.create({
          //         data: {
          //           contactId: existingContact?.id as number,
          //           userId: user.id,
          //         },
          //       });
          //       res.status(201).json({ message: "Chat Added" });
          //     }
          //   } catch (error) {
          //     res.status(500).json({ message: "Failed" });
          //   }
          // }
        } catch (error) {
          res.status(500).json({ message: "Error" });
        }
      } else {
        res.status(500).json({ message: "Error" });
      }
    } catch {
      res.status(500).json({ message: "Error" });
    }
  }
}
