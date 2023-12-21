import { AxiosError, AxiosHeaders } from 'axios';
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
      const headers = new AxiosHeaders();

      throw new AxiosError('Unauthorized', '401', undefined, null, {
        data: 'Unauthorized',
        status: 401,
        statusText: 'Unauthorized',
        config: {
          headers,
        },
        headers: {},
      });
    }

    // axios 기본 헤더 설정
    if (client.defaults.headers.common.Authorization !== `Bearer ${session.user.accessToken}`) {
      client.defaults.headers.common.Authorization = `Bearer ${session.user.accessToken}`;
    }

    return handler(...args);
  };
}