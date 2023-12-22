import { useGetChallengeInfoQuery } from '@/app/(challenge)/(다짐 도전)/module/api/challenge';
import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import { getDayPeriodToText } from '@/app/common/util/date';
import dayjs from 'dayjs';
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

  useEffect(() => {
    if (!challengeData) return;
    setChallengeInfo((prev) => ({
      ...prev,
      title: challengeData.data.goal.content.value,
      periodText: getDayPeriodToText(dayjs(challengeData.data.goal.startDate), 7),
    }));
  }, [challengeData]);

  const imageRef = useRef<HTMLDivElement>(null);

  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload(challengeInfo.title + ' ' + challengeInfo.periodText);
  };

  return {
    challengeInfo,
    imageRef,
    onClickDownload,
  };
};

export default useHandleSavePage;
