import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useQuery } from '@tanstack/react-query';

export type ChallengeType = 'FREE' | 'BILLING';

export interface Json {
  isSuccess: boolean;
  data: ChallengeData[];
  errorResponse: unknown;
}

export interface ChallengeList {
  isSuccess: boolean;
  data: ClientChallengeData[];
  errorResponse: unknown;
}

export interface ChallengeData {
  hostUserId: number;
  id: number;
  type: ChallengeType;
  content: Content;
  threshold: Threshold;
  startDate: StartDate;
  endDate: EndDate;
}

export interface ClientChallengeData {
  hostUserId: number;
  id: number;
  type: ChallengeType;
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
export type StartDate = Date;

export type EndDate = Date;

const getChallengeListAPI = withSessionUser(async () => {
  const { data } = await client<Json>({
    method: 'get',
    url: '/v1/api/goal',
    data: {},
  });

  return data;
});

export const GET_CHALLENGE_LIST_KEY = () => ['ChallengeList'];

export const useGetChallengeListQuery = () => {
  return useQuery({
    queryKey: GET_CHALLENGE_LIST_KEY(),
    queryFn: () => getChallengeListAPI(),
  });
};
