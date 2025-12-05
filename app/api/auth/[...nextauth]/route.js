import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "database", // simpan sesi ke MySQL
  },

  pages: {
    signIn: "/client-login", // login custom
  },

  callbacks: {
    // ⬇️ redirect setelah login register Google
    async redirect({ url, baseUrl }) {
      return "/client-dashboard"; 
    },

    async session({ session, user }) {
      // ambil user.id dari database
      session.user.id = user.id;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
