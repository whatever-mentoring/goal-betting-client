import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';

type PREDICTION_TYPE = 'SUCCESS' | 'FAIL';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  bettingRetrieveResponse: BettingRetrieveResponse;
}
export interface BettingRetrieveResponse {
  id: number;
  userId: number;
  goalId: number;
  predictionType: PREDICTION_TYPE;
  result: string;
}

interface RequestInterface {
  postData: {
    goalId: number;
    predictionType: PREDICTION_TYPE;
  };
}

const postParticipateChallengeAPI = withSessionUser(async ({ postData }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'post',
    url: '/v1/api/betting',
    data: postData,
  });
  return data;
});

export interface PostParticipateChallengeAPIRequest {
  token?: string;
}

const POST_PARTICIPATE_CHALLENGE_KEY = () => ['participateChallenge'];

interface postParticipateChallengeMutation {
  onSuccess?: () => void;
}

export const usePOSTParticipateChallengeMutation = ({
  onSuccess,
}: postParticipateChallengeMutation) => {
  return useMutation({
    mutationKey: POST_PARTICIPATE_CHALLENGE_KEY(),
    mutationFn: postParticipateChallengeAPI,
    onSuccess,
  });
};
