import { getSession } from 'next-auth/react';
import client from './client';

export function withSessionUser<R>(handler: () => Promise<R>): () => Promise<R>;
export function withSessionUser<T, R>(handler: (arg: T) => Promise<R>): (arg: T) => Promise<R>;

export function withSessionUser<T, R>(
  handler: (...args: T[]) => Promise<R>,
): (...args: T[]) => Promise<R> {
  return async (...args: T[]) => {
    const session = await getSession();
    if (!session || !session.user) {
      throw new Error('로그인이 필요합니다.');
    }

    // axios 기본 헤더 설정
    if (client.defaults.headers.common.Authorization !== `Bearer ${session?.user.accessToken}`) {
      client.defaults.headers.common.Authorization = `Bearer ${session?.user.accessToken}`;
    }

    return handler(...args);
  };
}
