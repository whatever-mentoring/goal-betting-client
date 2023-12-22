'use client';
import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { BETTING_RESULT } from '@/app/types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChallengeType } from './challengeList';

export interface Json {
  isSuccess: boolean;
  data: {
    goal: ChallengeData;
    myBetting: MyBetting | null;
  };
  errorResponse: unknown;
}

export interface ChallengeData {
  hostUserId: number;
  hostUserNickname: string;
  id: number;
  type: ChallengeType;
  content: Content;
  threshold: Threshold;
  startDate: Date;
  endDate: Date;
}

export interface MyBetting {
  id: number;
  userId: number;
  goalId: number;
  predictionType: BETTING_RESULT;
  result: BETTING_RESULT | null;
}

export interface Content {
  value: string;
}

export interface Threshold {
  value: number;
}

interface RequestInterface {
  goalId: number;
}

const getChallengeInfoAPI = withSessionUser(async ({ goalId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'get',
    url: `/v1/api/goal/${goalId}`,
  });
  return data;
});

export interface GetChallengeInfoQueryRequest {
  goalId: number;
  token?: string;
}

const GET_CHALLENGE_INFO_KEY = (params: GetChallengeInfoQueryRequest) => ['get', params.goalId];

export const useGetChallengeInfoQuery = (params: GetChallengeInfoQueryRequest) => {
  return useSuspenseQuery({
    queryKey: GET_CHALLENGE_INFO_KEY(params),
    queryFn: () => getChallengeInfoAPI(params),
    notifyOnChangeProps: ['data'],
  });
};
