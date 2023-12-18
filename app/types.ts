import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import type { AuthUser } from './api/auth/[...nextauth]/route';

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: AuthUser;
  }

  interface User extends DefaultUser {
    userId: number;
    nickname: string;
    accessToken: string;
    refreshToken: string;
  }

  interface JWT {
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    user: AuthUser;
  }
}
