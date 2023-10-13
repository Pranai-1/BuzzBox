import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

// Import User, assuming it's defined in your "types" module.
import { User } from "../types";

const prisma = new PrismaClient();
declare module "next-auth" {
    interface Session extends DefaultSession {
      user: {
        id: string;
        name: string;
        email: string;
        contacts: ContactType[];
        messages: MessageType[];
        password: string;
      } & DefaultSession["user"];
    }
  
    interface User {
      id: number;
      name: string;
      email: string;
      contacts: ContactType[];
      messages: MessageType[];
      password: string;
    }
  }
  type ContactType = {
  id: number;
  name: string;
  numberKey: number;
  userId: number;
};

type MessageType = {
  id: number;
  content: string;
  senderId: number;
};
  
export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.contacts = user.contacts;
        token.messages = user.messages;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.contacts = token.contacts as ContactType[];
        session.user.messages = token.messages as MessageType[];
      }
      return session;
    }
  },
  providers: [
    CredentialsProvider({
      type: 'credentials',
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
              messages: true,
              contacts: true
            }
          });

          if (!user) {
            return null;
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return null;
          }

          const session: User = {
            id: user.id,
            name: user.name,
            email: user.email,
            contacts: user.contacts,
            messages: user.messages,
            password: user.password
          };

          return session;
        } finally {
          await prisma.$disconnect();
        }
      }
    })
  ],
  pages: {
    signIn: "/login",
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on the first sign-in (leave the property out if not of interest)
  },
  secret:" process.env.NEXTAUTH_SECRET"
};

export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, authOptions);
};
