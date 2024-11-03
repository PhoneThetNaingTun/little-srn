import NextAuth from "next-auth";
import authConfg from "./auth.confg";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { getUserById } from "./data/user";
export const {
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  pages: { signIn: "/auth/login", error: "/auth/error" },

  callbacks: {
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      return token;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfg,
});
