import { NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { User } from "../types";
import { GetServerSidePropsContext } from "next";
const prisma = new PrismaClient();
export const authOptions:NextAuthOptions={
    session:{
    strategy:'jwt'
    },
    callbacks:{
        jwt({ token, user }:{token:any,user:User}) {
            if (user) {
              token.id = user.id;
              token.name = user.name;
              token.password=user.password
              token.email = user.email;
              token.contacts = user.contacts;
              token.messages = user.messages;
             
            }
            return token;
          },
          session({ session, token }:{session:any,token:any}) {
            if(session.user){
            session.user.id = token.id;
            session.user.password = token.password;
            session.user.name = token.name;
            session.user.email = token.email;
            session.user.contacts = token.contacts;
            session.user.messages = token.messages;
            }
            return session;
          }
    },
    providers: [
     CredentialsProvider({
        type:'credentials',
        credentials:{},
        async authorize(credentials, req) {
            const { email, password } = credentials as {
              email: string;
              password: string;
            };
          
            const user = await prisma.user.findFirst({
              where: { email },
              select: {
                id: true,
                name: true,
                email: true,
                password: true,
                messages: true,
                contacts: true,
              
              },
            });
          
            prisma.$disconnect();
          
            if (!user) {
              return null;
            }
          
            const passwordMatch = await new Promise<boolean>((resolve, reject) => {
              bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                  reject(err);
                }
                resolve(result);
              });
            });
          
            if (!passwordMatch) {
              return null;
            }
          
            if (user) {
                for (const key in user) {
                  if (user.hasOwnProperty(key)) {
                    console.log(key);
                  }
                }
              }
            const session = {
                id: user.id,
                name: user.name,
                email: user.email,
                contacts: user.contacts,
                messages: user.messages,
                password:user.password
              };
      
              return session;
           
          }
     })
    ],
    
    pages: {
        signIn: "/login",
        // signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
      },
     
      secret:" process.env.NEXTAUTH_SECRET",
}

export const getServerAuthSession = (ctx: {
    req: GetServerSidePropsContext["req"];
    res: GetServerSidePropsContext["res"];
  }) => {
    return getServerSession(ctx.req, ctx.res, authOptions);
  };