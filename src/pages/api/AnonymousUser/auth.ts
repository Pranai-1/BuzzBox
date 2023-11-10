import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken"

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const token = req.cookies.token;
if (!token) {
    return 
  }
try {
   const user:string|jwt.JwtPayload = jwt.verify(token, "userSecretKey");
   if(typeof user!="string"){
   req.headers["AnonId"]=user.id
   req.headers["AnonName"]=user.name
   
   }
 
} catch (error) {
  console.log(error)
    return res.status(403).json({ message: "Invalid token" });
  }
}