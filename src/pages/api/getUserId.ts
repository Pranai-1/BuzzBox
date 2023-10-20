import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next/types";

export default async function getUserId(req:NextApiRequest,res:NextApiResponse){
    const prisma=new PrismaClient()
    const contactId=Number(req.headers["openedchatid"])
    try{
    const contact=await prisma.contact.findFirst({
        where:{
            id:contactId
        }
    })
    if(contact){
        const numberKey=contact.numberKey
        const user=await prisma.user.findFirst({where:{numberKey}})
        if(user){
            res.status(200).json({messages:"success",id:user.id})
        }else{
            res.status(408).json({messages:"failed",id:0})

        }
    }else{
        res.status(404).json({messages:"failed",id:0})
    }
}catch(error){
    console.log(error)
    res.status(406).json({messages:"failed"})
}
}