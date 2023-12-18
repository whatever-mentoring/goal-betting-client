import { withSessionUser } from '@/app/common/api/withSessionUser';
import client from '@/app/common/api/client';
import { useQuery } from '@tanstack/react-query';

export interface GetUserInfoAPIResponse {
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

const getUserInfoAPI = withSessionUser(async () => {
  const { data } = await client<GetUserInfoAPIResponse>({
    method: 'get',
    url: '/v1/api/user',
    data: {},
  });
  return data;
});

export interface GET_USERINFO_QUERY {
  token?: string;
}

const GET_USERINFO_KEY = () => ['get'];

export const useGETUserInfoQuery = () => {
  return useQuery({
    queryKey: GET_USERINFO_KEY(),
    queryFn: () => getUserInfoAPI(),
  });
};
