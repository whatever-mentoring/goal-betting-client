import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

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
  const { update } = useSession();
  return useMutation({
    mutationKey: PUT_NICKNAME_KEY(),
    mutationFn: putNicknameAPI,
    onSuccess: async (data) => {
      await update({ nickname: data.data.nickname.value });
    },
  });
};

export interface CheckNicknameJson {
  isSuccess: boolean;
  data: CheckNicknameData;
  errorResponse: unknown;
}
export interface CheckNicknameData {
  nicknameIsDuplicated: boolean;
}

interface POSTNicknameCheckRequestInterface {
  postData: {
    nickname: string;
  };
}

const postCheckNickname = withSessionUser(
  async ({ postData }: POSTNicknameCheckRequestInterface) => {
    const { data } = await client<CheckNicknameJson>({
      method: 'post',
      url: '/v1/api/user/nickname',

      data: postData,
    });
    return data;
  },
);

export interface PostCheckNicknameRequest {
  token?: string;
}

export const usePostCheckNicknameMutation = () => {
  return useMutation({
    mutationFn: postCheckNickname,
  });
};
