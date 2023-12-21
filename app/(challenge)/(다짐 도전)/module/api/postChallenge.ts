import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  goalProofRetrieveResponse: GoalProofRetrieveResponse;
}
export interface GoalProofRetrieveResponse {
  id: number;
  userId: number;
  goalId: number;
  url: string;
  comment: string;
}

interface RequestInterface {
  postData: {
    goalId: number;
    url: string;
    comment: string;
  };
}

const postAPI = withSessionUser(async ({ postData }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'post',
    url: '/v1/api/goal-proof',
    params: { undefined },
    data: postData,
  });
  return data;
});

export interface PostAPIRequest {
  token?: string;
}

const POST_CHALLENGE_CERTIFICATE_KEY = () => ['POST_CHALLENGE_CERTIFICATE'];

interface postMutation {
  onSuccess?: (data: Json) => void;
}

export const usePOSTChallengeCertificate = ({ onSuccess }: postMutation) => {
  return useMutation({
    mutationKey: POST_CHALLENGE_CERTIFICATE_KEY(),
    mutationFn: postAPI,
    onSuccess,
  });
};
