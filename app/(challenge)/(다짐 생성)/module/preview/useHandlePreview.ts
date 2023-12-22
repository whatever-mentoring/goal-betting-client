import { GET_CHALLENGE_LIST_KEY } from '@/app/(challenge)/(다짐 도전)/module/api/challengeList';
import navigationPath from '@/app/common/navigation/navigationPath';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { ChallengeAddFunnelProps } from '../../add/page';
import { usePOSTChallengeQuery } from '../api/challenge';

type PickData = Pick<ChallengeAddFunnelProps, 'challenge'>;
interface PreviewProps extends PickData {}

const useHandlePreview = ({ challenge }: PreviewProps) => {
  const router = useRouter();
  const { mutate } = usePOSTChallengeQuery();
  const queryClient = useQueryClient();

  const submit = () => {
    mutate(
      {
        postData: {
          type: challenge.gifticon.imgSrc ? 'BILLING' : 'FREE',
          content: challenge.title,
          startDate: dayjs(challenge.startDate).toISOString(),
          endDate: dayjs(challenge.startDate).add(7, 'day').toISOString(),
        },
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({
            queryKey: GET_CHALLENGE_LIST_KEY(),
          });
          router.push(navigationPath.다짐_공유_페이지(data.data.id));
        },
      },
    );
  };

  return {
    submit,
  };
};

export default useHandlePreview;
