import client from '@/app/common/api/client';
import { withSessionUser } from '@/app/common/api/withSessionUser';
import { useMutation } from '@tanstack/react-query';

export type Json = string;

interface RequestInterface {
  bettingId: number;
}

const deleteParticipateAPI = withSessionUser(async ({ bettingId }: RequestInterface) => {
  const { data } = await client<Json>({
    method: 'delete',
    url: `/v1/api/betting/${bettingId}`,
  });
  return data;
});

const DELETE_PARTICIPATE_KEY = () => ['DELETE_PARTICIPATE'];

export const useDeleteParticipateMutation = () => {
  return useMutation({
    mutationKey: DELETE_PARTICIPATE_KEY(),
    mutationFn: deleteParticipateAPI,
  });
};
