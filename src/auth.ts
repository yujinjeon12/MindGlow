import NextAuth from "next-auth";
import prisma from "./client";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "@auth/core/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const authResponse = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          }
        );
        const result = await authResponse.json();
        if (result.user) {
          return result.user;
        } else {
          return null;
        }
      },
    }),
    Google,
  ],
  secret: process.env.AUTH_SECRET, // 환경 변수에서 비밀키 가져오기
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //세션에 user id 값 세팅
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
