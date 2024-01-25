import { client } from '@/service/sanity';
import { addUser } from '@/service/user';
import NextAuth from 'next-auth/next';
import GitHubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
  ],
  callbacks: {
    async signIn({ user: { id, name, email, image } }) {
      if (!email) return false;
      addUser({ id, name, email, image });
      return true;
    },
    async session({ session }) {
      const user = session.user;
      const params = { email: user.email };
      await client
        .fetch(
          `*[_type =="user" && email == $email] {isAdmin, isRegister}`,
          params,
        )
        .then((res) => {
          const isAdmin = res[0].isAdmin ? true : false;
          const isRegister = res[0].isRegister ? true : false;
          session.user = {
            ...user,
            isAdmin,
            isRegister,
          };
        });
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
