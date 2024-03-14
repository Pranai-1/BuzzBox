import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const id = Number(req.headers.id);
    console.log(id+"id")

    try {
        const data = await prisma.user.findFirst({ where: { id } });

        if (!data) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = await prisma.user.findFirst({
            where: { id },
            select: {
                contacts: {
                    where: { userId: data.id },
                    include: { contact: true }
                },
                rooms: {
                    where: { userId: data.id },
                    include: { room: true }
                }
            }
        });

        return res.status(200).json({ message: "success", user });
    } catch (error) {
        console.error("Prisma error:", error);
        return res.status(500).json({ message: "Server error" });
    } finally {
        await prisma.$disconnect();
    }
}
