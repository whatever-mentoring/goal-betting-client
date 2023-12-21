'use client';
import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface ParticipantsList {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  hostUser: HostUser;
  participants: Participants[];
}
export interface HostUser {
  id: number;
  nickname: string;
  goalCreatedAt: Date;
}

export interface Participants {
  userId: number;
  nickname: string;
  bettingId: number;
  predictionType: string;
  result: string;
  bettingCreatedAt: BettingCreatedAt;
}

export type BettingCreatedAt = Date;
interface RequestInterface {
  goalId: number;
  token?: string;
}

const getParticipantAPI = withSessionUser(async ({ goalId }: RequestInterface) => {
  const { data } = await client<ParticipantsList>({
    method: 'get',
    url: `/v1/api/goal/betting/${goalId}`,
  });
  return data;
});

export interface GetParticipantAPIRequest {
  goalId: number;
}

export const GET_CHALLENGE_PARTICIPANT_LIST_KEY = (params: GetParticipantAPIRequest) => [
  'GET_CHALLENGE_PARTICIPANT_LIST',
  params.goalId,
];

export const useGETChallengeParticipantQuery = (params: GetParticipantAPIRequest) => {
  return useSuspenseQuery({
    queryKey: GET_CHALLENGE_PARTICIPANT_LIST_KEY(params),
    queryFn: () => getParticipantAPI(params),
  });
};
