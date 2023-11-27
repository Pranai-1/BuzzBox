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


//  The `jwt` and `session` callbacks in NextAuth.js are internally managed by the NextAuth.js library, and they are automatically 
//called at specific points in the authentication process. Developers do not need to manually invoke these callbacks; instead, 
//NextAuth.js takes care of invoking them based on predefined events in the authentication flow.

// Here's a summary:

// 1. **`jwt` Callback:**
//    - Automatically called by NextAuth.js during the creation or updating of a JSON Web Token (JWT).
//    - Occurs, for example, when a user logs in, the JWT is refreshed, or there are other events that trigger a change in the JWT.

// 2. **`session` Callback:**
//    - Automatically called by NextAuth.js when a user session is created or updated.
//    - Takes place after the `jwt` callback and allows you to synchronize the server-side session with the data present in the JWT.

// Developers provide these callbacks as part of the NextAuth.js configuration, and the library internally invokes them as needed 
//during the authentication process. This design allows for customization and extension of the authentication flow without requiring 
//manual intervention.

// UseSession:-
// When you use `useSession()` in NextAuth.js on the client side, the library typically communicates with an API route that is 
//automatically set up by NextAuth.js. This API route is responsible for handling authentication-related requests, such as checking the 
//authentication status, fetching user information, and managing sessions.

// The default API route provided by NextAuth.js is typically located at `/api/auth`. So, when you call `useSession()`, it sends 
//requests to the `/api/auth/session` endpoint to retrieve the session information.This session is automatically created and managed 
//by next-auth library

// Here's a breakdown of the process:

// 1. **Client-Side Component:**
//    - You call `useSession()` in a Next.js component on the client side.

// 2. **NextAuth.js API Route:**
//    - Internally, `useSession()` makes requests to the `/api/auth/session` endpoint.

// 3. **Authentication Status Check:**
//    - The API route at `/api/auth/session` checks the authentication status based on the user's session.

// 4. **Session Information:**
//    - If the user is authenticated, the API route responds with information about the authenticated user, including properties such as `user.id`, `user.name`, etc.

// 5. **Reactivity:**
//    - The component re-renders based on the updated session information obtained from the `/api/auth/session` API route.

// This communication with the API route is handled behind the scenes by NextAuth.js, and developers typically don't need to 
//manually configure or interact with this API route. It's part of the default setup provided by NextAuth.js to manage 
//authentication on the server side. If needed, you can customize the NextAuth.js configuration to adjust the API routes or 
//other aspects of the authentication flow.