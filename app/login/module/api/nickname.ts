import { withSessionUser } from '@/app/common/api/withSessionUser';
import client from '@/app/common/api/client';
import { useMutation } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  userId: number;
  nickname: Nickname;
}
export interface Nickname {
  value: string;
}

interface RequestInterface {
  putData: {
    nickname: string;
  };
  token?: string;
}

const putNicknameAPI = withSessionUser(async ({ putData }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'put',
    url: '/v1/api/user',
    data: putData,
  });
  return data;
});

export interface PutNicknameAPIRequest {
  token?: string;
}

const PUT_NICKNAME_KEY = () => ['nickname'];

export const usePUTNickname = () => {
  return useMutation({
    mutationKey: PUT_NICKNAME_KEY(),
    mutationFn: putNicknameAPI,
  });
};
