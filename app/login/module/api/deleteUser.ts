import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';

export interface DeleteUserInfoAPIResponse {
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

const deleteUserInfoAPI = withSessionUser(async () => {
  const { data } = await client<DeleteUserInfoAPIResponse>({
    method: 'delete',
    url: '/v1/api/user',
    data: {},
  });
  return data;
});

export interface DELETE_USERINFO_QUERY {
  token?: string;
}

const DELETE_USERINFO_KEY = () => ['DELETE_USERINFO'];

export const useDELETEUserInfoMutation = () => {
  return useMutation({
    mutationKey: DELETE_USERINFO_KEY(),
    mutationFn: () => deleteUserInfoAPI(),
  });
};
