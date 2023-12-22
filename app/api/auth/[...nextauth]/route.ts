import { User } from 'next-auth';
import NextAuth from 'next-auth/next';
import KakaoProvider from 'next-auth/providers/kakao';
import { postRefreshToken, postToken } from '../token';

export interface AuthUser extends User {
  userId: number;
  nickname: string;
  accessToken: string;
  refreshToken: string;
  nicknameIsModified: boolean;
}

const handler = NextAuth({
  providers: [
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user.accessToken) {
        try {
          const { data } = await postRefreshToken({ accessToken: user.accessToken });

          user.accessToken = data.accessToken;
          user.refreshToken = data.refreshToken;

          return true;
        } catch (error) {
          console.error(error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, session, account, trigger }) {
      if (trigger === 'update') {
        if (session.nickname) {
          return {
            ...token,
            user: {
              ...(token.user as AuthUser),
              nickname: session.nickname,
            },
          };
        }
      }
      if (account && account.access_token) {
        try {
          const user = await postToken({ accessToken: account.access_token as string });

          return {
            accessToken: user.data.accessToken,
            accessTokenExpires: Date.now() + 60 * 30,
            refreshToken: user.data.refreshToken,
            user: user.data,
          };
        } catch (error) {
          console.error(error);
        }
      }
      return {
        ...token,
      };
    },

    async session({ session, token }) {
      session.user = token.user as AuthUser;

      return session;
    },
  },

  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
