import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { BETTING_RESULT, BETTING_TYPE } from '@/app/types';
import { useQuery } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Bet[];
  errorResponse: unknown;
}

interface Bet {
  goal: Data;
  myBetting: MyBetting | null;
}

export interface MyBetting {
  id: number;
  userId: number;
  goalId: number;
  predictionType: BETTING_RESULT;
  result: BETTING_RESULT | null;
}

export interface Data {
  hostUserId: number;
  id: number;
  type: BETTING_TYPE;
  content: Content;
  threshold: Threshold;
  startDate: Date;
  endDate: Date;
}
export interface Content {
  value: string;
}
export interface Threshold {
  value: number;
}

const getMyBetListAPI = withSessionUser(async () => {
  const { data } = await client<Json>({
    method: 'get',
    url: '/v1/api/me/bet-goal',
  });
  return data;
});

export interface GetMyBetListAPIRequest {
  token?: string;
}

const GET_BET_LIST_KEY = () => ['GET_BET_LIST'];

export const useGETBetListQuery = () => {
  return useQuery({
    queryKey: GET_BET_LIST_KEY(),
    queryFn: getMyBetListAPI,
  });
};
