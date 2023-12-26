import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import { LabelProps } from '@/app/common/ui/Label/Label';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';
import { useGETCertificateResultQuery } from '../api/certificate';
import { useGETCertificateListQuery } from '../api/certificateList';
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
      title: challengeData.data.goal.content.value,
    }));
  }, [challengeData]);

  const { data: certificatedData } = useGETCertificateResultQuery({ goalProofId });
  const { data: certificateList } = useGETCertificateListQuery({ goalId });

  // TODO : 백엔드 API 변경 필요
  useEffect(() => {
    if (!certificateList) return;
    if (!goalProofId) return;
    const certificateInfo = certificateList.data.goalProofs.find(
      (certificate) => Number(certificate.id) === Number(goalProofId),
    );
    if (!certificateInfo) return;
    setCertification((prev) => ({
      ...prev,
      label: {
        text: `${certificateInfo.progressDay}일차`,
        labelColor: 'purple400',
      },
    }));
  }, [certificateList, goalProofId]);

  useEffect(() => {
    if (!challengeData) return;
    if (!certificatedData) return;
    const certificateInfo = certificateList.data.goalProofs.find(
      (certificate) => certificate.id === Number(goalProofId),
    );
    if (!certificateInfo) return;
    setCertification((prev) => ({
      ...prev,
      dateText: dayjs(challengeData.data.goal.startDate)
        .add(certificateInfo.progressDay, 'day')
        .format('YYYY.MM.DD'),
    }));
  }, [challengeData, certificatedData, goalProofId]);

  useEffect(() => {
    if (!certificatedData) return;
    setCertification((prev) => ({
      ...prev,
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
      files: [Object.assign(new File([], ''), { preview: certification.imgSrc })],
    });
  };

  return { certification, imageRef, onClickDownload, onClickShare };
};

export default useHandleCertificateSuccess;
