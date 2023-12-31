import { useGetChallengeInfoQuery } from '@/app/(challenge)/(다짐 도전)/module/api/challenge';
import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import { getDayPeriodToText } from '@/app/common/util/date';
import { useEffect, useRef, useState } from 'react';

interface HandleSaveProps {
  goalId: number;
}

interface ChallengeInfo {
  title: string;
  periodText: string;
}

const useHandleSavePage = ({ goalId }: HandleSaveProps) => {
  const { data: challengeData } = useGetChallengeInfoQuery({ goalId });

  const [challengeInfo, setChallengeInfo] = useState<ChallengeInfo>({
    title: '',
    periodText: '',
  });
  const [isChallengeSuccess, setIsChallengeSuccess] = useState(false);

  useEffect(() => {
    if (!challengeData) return;
    setChallengeInfo((prev) => ({
      ...prev,
      title: challengeData.data.goal.content.value,
      periodText: getDayPeriodToText(challengeData.data.goal.startDate, 7),
    }));
    setIsChallengeSuccess(challengeData.data.goal.result === 'SUCCESS');
  }, [challengeData]);

  const imageRef = useRef<HTMLDivElement>(null);

  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload(challengeInfo.title + challengeInfo.periodText + '.png');
  };

  const getHeaderText = (isChallengeSuccess: boolean) => {
    if (isChallengeSuccess) {
      return '7일 동안 고생했어!';
    }
    return '다음에는\n다짐을 성공해보자';
  };

  return {
    isChallengeSuccess,
    challengeInfo,
    imageRef,
    onClickDownload,
    getHeaderText,
  };
};

export default useHandleSavePage;
