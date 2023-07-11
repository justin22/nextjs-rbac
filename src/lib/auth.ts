import type { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prismaClient from "./prisma";
import { handleUserSetup } from "commons/services/auth";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prismaClient),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account, trigger, user }) {
      let userData = null;
      if (user?.email) {
        userData = await handleUserSetup(user.email)
      }
      console.log(`user -- ${JSON.stringify(user)}`)
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.user = {
          ...user,
          permissions: userData?.permissions,
          teamId: userData?.teamId,
          roleId: userData?.roleId
        }
      }
      return token
    },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      session.accessToken = token.accessToken
      session.user = {
        ...session.user,
        permissions: token.user?.permissions,
        teamId: token.user?.teamId,
        roleId: token.user?.roleId
      };
      return session
    },
  }
};
