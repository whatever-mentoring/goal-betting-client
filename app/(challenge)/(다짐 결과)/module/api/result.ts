import client from '@/app/common/api/client';
import { useQuery } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}

type PREDICTION_TYPE = 'PROCEEDING' | 'FAIL' | 'GET_GIFTICON' | 'NO_GIFTICON';

export interface Data {
  id: number;
  userId: number;
  goalId: number;
  predictionType: PREDICTION_TYPE;
  result: string;
}

interface RequestInterface {
  bettingId: number;
  token?: string;
}

const getBettingInfoAPI = async ({ bettingId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'get',
    url: `/v1/api/betting/${bettingId}`,
  });
  return data;
};

export interface GetBettingInfoAPIRequest {
  bettingId: number;
  token?: string;
}

const GET_BETTING_RESULT = (params: GetBettingInfoAPIRequest) => ['get', params.bettingId];

export const useGetBettingInfoQuery = (params: GetBettingInfoAPIRequest) => {
  return useQuery({
    queryKey: GET_BETTING_RESULT(params),
    queryFn: () => getBettingInfoAPI(params),
    enabled: !!params.bettingId,
  });
};
