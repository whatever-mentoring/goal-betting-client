import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useQuery } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  goalId: number;
  gifticonId: number;
  gifticonURL: string;
}

interface RequestInterface {
  goalId: number;
  token?: string;
}

const getGifticonAPI = withSessionUser(async ({ goalId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'get',
    url: `/v1/api/goal-gifticon/${goalId}`,
  });
  return data;
});

export interface GetAPIRequest {
  goalId: number;
}

const GET_GIFTICON = (params: GetAPIRequest) => ['GET_GIFTICON', params.goalId];

export const useGETGifticonQuery = (params: GetAPIRequest) => {
  return useQuery({
    queryKey: GET_GIFTICON(params),
    queryFn: () => getGifticonAPI(params),
  });
};
