import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const prisma=new PrismaClient()
  let arr=[]
 const id=Number(req.headers["id"])

    try{
    const user=await prisma.user.findFirst({
        where:{
            id
        }
    })
    if(user){
        const roomData=await prisma.roomUser.findMany({
            where:{
                userId:user.id
            }
        })
        if(roomData){
            for (const obj of roomData) {
                const keys = await prisma.room.findFirst({
                  where: {
                    id: obj.roomId,
                  },
                });
                arr.push(keys);
              }
              res.status(200).json({message:"success",rooms:arr})
        }
      
    }
}catch(error){
    console.log("Hello")
    console.log(error)
    res.status(404).json({message:"failed",rooms:[]})
}finally{
    prisma.$disconnect()
}
}