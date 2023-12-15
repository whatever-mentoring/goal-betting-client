import { User } from 'next-auth';
import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';

export interface AuthUser extends User {
  accessToken: string;
  accessTokenExpires: number;
  refreshToken: string;
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          accessToken: account.access_token,
          accessTokenExpires: account.expires_at,
          refreshToken: account.refresh_token,
          user,
        };
      }
      return {
        ...token,
      };
    },

    async session({ session, token }) {
      session.user = token as unknown as AuthUser;
      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
