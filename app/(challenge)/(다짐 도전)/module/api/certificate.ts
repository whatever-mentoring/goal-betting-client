import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface Json {
  isSuccess: boolean;
  data: Data;
  errorResponse: unknown;
}
export interface Data {
  id: number;
  userId: number;
  goalId: number;
  url: string;
  comment: string;
}

interface RequestInterface {
  goalProofId: number;
}

const getCertificateAPI = withSessionUser(async ({ goalProofId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'get',
    url: `/v1/api/goal-proof/${goalProofId}`,
    params: {},
    data: {},
  });
  return data;
});

export interface GetCertificateQueryRequest {
  goalProofId: number;
}

const GET_CERTIFICATE_RESULT_KEY = (params: GetCertificateQueryRequest) => [
  'GET_CERTIFICATE_RESULT_KEY',
  params.goalProofId,
];

export const useGETCertificateResultQuery = (params: GetCertificateQueryRequest) => {
  return useSuspenseQuery({
    queryKey: GET_CERTIFICATE_RESULT_KEY(params),
    queryFn: () => getCertificateAPI(params),
  });
};
