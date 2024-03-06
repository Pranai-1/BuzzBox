import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";
import { ContactType, ContactUserType, User } from "../types";

const prisma = new PrismaClient();

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      name: string;
      email: string;
      contacts: ContactUserType[];
      password: string;
      numberKey: number;
    } & DefaultSession["user"];
  }
  interface User {
    id: number;
    name: string;
    email: string;
    contacts: ContactUserType[];
    password: string;
    numberKey: number;
  }
 
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.contacts = user.contacts;
        token.numberKey = user.numberKey;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.contacts = token.contacts as ContactUserType[];
        session.user.numberKey = token.numberKey as number;
      }
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        try {
          const user = await prisma.user.findFirst({
            where: { email },
            select: {
              id: true,
              name: true,
              email: true,
              password: true,
              contacts: true,
              numberKey: true,
            },
          });
       console.log(user)
          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          const session:User = {
            id: user.id,
            name: user.name,
            email: user.email,
            contacts: user.contacts,
            password: user.password,
            numberKey: user.numberKey,
          };
          return session;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on the first sign-in (leave the property out if not of interest)
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};


