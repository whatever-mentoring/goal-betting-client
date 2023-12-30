import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  id: number;
  type: string;
  content: Content;
  threshold: Threshold;
  startDate: StartDate;
  endDate: EndDate;
}
export interface Content {
  value: string;
}
export interface Threshold {
  value: number;
}
export type StartDate = number[];

export type EndDate = number[];

interface RequestInterface {
  postData: {
    type: 'FREE' | 'BILLING';
    content: string;
    startDate: string;
    endDate: string;
    gifticonUrl?: string | null;
  };
}

const postChallengeAPI = withSessionUser(async ({ postData }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'post',
    url: '/v1/api/goal',
    data: postData,
  });
  return data;
});

const POST_CHALLENGE_KEY = () => ['challenge'];

export const usePOSTChallengeQuery = () => {
  return useMutation({
    mutationKey: POST_CHALLENGE_KEY(),
    mutationFn: postChallengeAPI,
  });
};
