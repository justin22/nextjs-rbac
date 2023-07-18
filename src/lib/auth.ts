import type { NextAuthOptions } from "next-auth";
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
    async jwt({ token, account, user }) {
      let userData = null;
      if (user?.email) {
        userData = await handleUserSetup(user.email)
      }
      if (account) {
        token.accessToken = account.access_token
      }
      if (user) {
        token.user = {
          ...user,
          permissions: userData?.permissions,
          role: userData?.role,
          currentTeamId: userData?.currentTeamId,
          teams: userData?.teams
        }
      }
      return token
    },
    async session({ session, token, user }: { session: any, token: any, user: any }) {
      session.accessToken = token.accessToken
      session.user = {
        ...session.user,
        permissions: token.user?.permissions,
        role: token.user?.role,
        currentTeamId: token.user?.currentTeamId,
        teams: token.user?.teams
      };
      return session
    },
  }
};
