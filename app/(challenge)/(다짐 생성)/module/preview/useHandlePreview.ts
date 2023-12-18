import dayjs from 'dayjs';
import { ChallengeAddFunnelProps } from '../../add/page';
import { usePOSTChallengeQuery } from '../api/challenge';

type PickData = Pick<ChallengeAddFunnelProps, 'challenge'>;
interface PreviewProps extends PickData {}

const useHandlePreview = ({ challenge }: PreviewProps) => {
  const { mutate } = usePOSTChallengeQuery();

  const submit = () => {
    mutate({
      postData: {
        type: 'FREE',
        content: challenge.title,
        startDate: dayjs(challenge.startDate).toISOString(),
        endDate: dayjs(challenge.startDate).add(7, 'day').toISOString(),
      },
    });
  };

  return {
    submit,
  };
};

export default useHandlePreview;
