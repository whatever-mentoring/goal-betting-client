import { AxiosError } from 'axios';
import 'next-auth';
import { DefaultSession, DefaultUser } from 'next-auth';
import { AuthUser } from './api/auth/[...nextauth]/route';

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

export type BETTING_TYPE = 'FREE' | 'BILLING';
export type BETTING_RESULT = 'PROCEEDING' | 'FAIL' | 'GET_GIFTICON' | 'NO_GIFTICON';

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError;
  }
}
