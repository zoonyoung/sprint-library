import NextAuth, { User } from "next-auth";
import GitHub from "next-auth/providers/github";
import "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";

import { addTempUser, getUserByEmail } from "./api/_utils";

type DbUser = {
  isRegister: boolean;
  isSignUp: boolean;
  isAdmin: boolean;
  course: string;
  id: number;
};

type ExtendedUser = Omit<User, "id"> & Partial<DbUser> & AdapterUser;

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: ExtendedUser;
  }
  interface User {
    dbUser?: DbUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    user: ExtendedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [GitHub],
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user }) {
      const email = user.email ?? "";
      const name = user.name ?? "";
      const image = user.image ?? ""; // Changed from user.email to user.image
      const dbUser = await getUserByEmail(email);
      if (!dbUser) {
        await addTempUser(name, email, image);
        return "/signup";
      }
      (user as any).dbUser = dbUser;
      return true;
    },
    async jwt({ token, user, account }) {
      if (user) {
        const { dbUser, ...sessionUser } = user;
        token.user = {
          ...sessionUser,
          ...(dbUser || {}),
        } as ExtendedUser;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      return session;
    },
  },
});
