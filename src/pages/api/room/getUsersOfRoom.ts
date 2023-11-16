import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function Handler(req:NextApiRequest,res:NextApiResponse){
    const roomId=Number(req.headers["roomid"])
    console.log(roomId)
    const prisma=new PrismaClient()
    try{
        const roomUsers=await prisma.roomUser.findMany({
                where:{
                    roomId
                }
            })
           res.status(200).json({message:"success",roomUsers})
    }catch(error){
        res.status(404).json({message:"Failed"})
    }finally{
        prisma.$disconnect()
    }
}