import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import { LabelProps } from '@/app/common/ui/Label/Label';
import { covertFormatDate, nthDayFromStartDate } from '@/app/common/util/date';
import { useEffect, useRef, useState } from 'react';
import { useGETCertificateResultQuery } from '../api/certificate';
import { useGetChallengeInfoQuery } from '../api/challenge';

interface HandleCertificateSuccessProps {
  goalId: number;
  goalProofId: number;
}

interface CertificateInfo {
  label: LabelProps;
  title: string;
  dateText: string;
  imgSrc: string;
  content: string;
}

const useHandleCertificateSuccess = ({ goalId, goalProofId }: HandleCertificateSuccessProps) => {
  const [certification, setCertification] = useState<CertificateInfo>({
    label: {
      text: '',
      labelColor: 'grey200',
    },
    dateText: '',
    title: '',
    imgSrc: '',
    content: '',
  });
  // SERVER
  const { data: challengeData } = useGetChallengeInfoQuery({ goalId });
  useEffect(() => {
    if (!challengeData) return;
    setCertification((prev) => ({
      ...prev,
      label: {
        text: `${nthDayFromStartDate(challengeData.data.goal.startDate)}일차`,
        labelColor: 'purple400',
      },
      title: challengeData.data.goal.content.value,
    }));
  }, [challengeData]);

  const { data: certificatedData } = useGETCertificateResultQuery({ goalProofId });

  useEffect(() => {
    if (!certificatedData) return;
    setCertification((prev) => ({
      ...prev,
      dateText: covertFormatDate(new Date(), 'YYYY.MM.DD일'),
      imgSrc: certificatedData.data.url,
      content: certificatedData.data.comment,
    }));
  }, [certificatedData]);

  // USER INTERACTION
  // 사용자 > 이미지 다운로드
  const imageRef = useRef<HTMLDivElement>(null);
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  // 사용자 > 공유하기
  const { triggerShare } = useTriggerShare();

  const onClickShare = () => {
    triggerShare({
      title: certification.title,
    });
  };

  return { certification, imageRef, onClickDownload, onClickShare };
};

export default useHandleCertificateSuccess;
