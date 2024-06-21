import { db } from '@/service/kysely';
import NextAuth from 'next-auth/next';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt'
  },
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    })
  ],
  callbacks: {
    async session(session) {
      const { name, email, image } = session.user;
      const response = await db
        .insertInto('users')
        .values({ name, email, image, isRegister: false, isAdmin: false })
        .execute();
      console.log(response);
      return session;
    }
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
