import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma=new PrismaClient()
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const id:number=Number(req.headers.id)
    try{
    const data=await prisma.user.findFirst({
        where: { id},})
        if(!data)
        res.status(404).json({message:"User not found"})
 const user = await prisma.user.findFirst({
    where: { id},
    select: {
      contacts: {
        where: { userId: data?.id },
        include: { contact: true }
      },
      rooms:{
        where:{userId:data?.id},
        include:{room:true}
      }
    },
  });
  res.status(200).json({message:"success",user})
}catch(error){
    console.log(error)
    res.status(500).json({message:"server error"})
}finally{
    prisma.$disconnect()
}
}