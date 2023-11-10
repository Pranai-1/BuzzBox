import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import randomName from 'random-name';
import jwt from "jsonwebtoken"
export default async function AnonLogin(req:NextApiRequest,res:NextApiResponse){
  const body=req.body;
  if(body.gender.length==0){
    res.status(404).json({error:"Error"})
  }
  const prisma=new PrismaClient();
  const firstName = randomName.first();
  const lastName=randomName.last();
  const name=firstName+" "+lastName
  const gender:string=body.gender
  try{
   const user=await prisma.anonymousUser.create({
    data:{
      name,
      gender
    }
   })
   let userToken = jwt.sign({ id: user.id,name:user.name }, "userSecretKey", { expiresIn: '1d' });
   res.setHeader("Set-Cookie", `token=${userToken}; HttpOnly; Secure; SameSite=Strict; Path=/`);
}catch(error){
    console.log(error)
    res.status(404).json({error:"Error"})
}finally{
    prisma.$disconnect()
}
  res.status(200).json({name})
}