import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  goalProofs: GoalProofs[];
  progressDays: number[];
}
export interface GoalProofs {
  id: number;
  userId: number;
  goalId: number;
  url: string;
  comment: string;
}

interface RequestInterface {
  goalId: number;
}

const getAPI = withSessionUser(async ({ goalId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'get',
    url: `/v1/api/goal/${goalId}/goal-proof`,
  });
  return data;
});

export interface GetAPIRequest {
  goalId: number;
  token?: string;
}

const GET_CERTIFICATE_LIST_KEY = (params: GetAPIRequest) => [
  'GET_CERTIFICATE_LIST_KEY',
  params.goalId,
];

export const useGETCertificateListQuery = (params: GetAPIRequest) => {
  return useSuspenseQuery({
    queryKey: GET_CERTIFICATE_LIST_KEY(params),
    queryFn: () => getAPI(params),
  });
};
