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

export interface WithoutAuthParticipantsList {
  isSuccess: boolean;
  data: WithoutAuthParticipantsListData;
  errorResponse: unknown;
}
export interface WithoutAuthParticipantsListData {
  hostUser: HostUser;
  participants: Participants[];
}

interface RequestInterface {
  goalId: number;
}

const getParticipantListAPI = async ({ goalId }: RequestInterface) => {
  const { data } = await client<WithoutAuthParticipantsList>({
    method: 'get',
    url: `/v1/api/goal/betting/${goalId}/no-auth`,
  });
  return data;
};

export interface GetParticipantListAPIRequest {
  goalId: number;
  token?: string;
}

const GET_PARTICIPANT_WITHOUT_TOKEN = (params: GetParticipantListAPIRequest) => [
  'GET_PARTICIPANT_WITHOUT_TOKEN',
  params.goalId,
];

export const useGETParticipantListWithoutTokenQuery = (params: GetParticipantListAPIRequest) => {
  return useSuspenseQuery({
    queryKey: GET_PARTICIPANT_WITHOUT_TOKEN(params),
    queryFn: () => getParticipantListAPI(params),
  });
};
