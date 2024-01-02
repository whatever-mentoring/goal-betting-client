import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import { useEffect, useRef, useState } from 'react';
import { useGETGifticonQuery } from '../api/gifticon';

interface HandleGifticonPageProps {
  goalId: number;
}

const useHandleGifticonPage = ({ goalId }: HandleGifticonPageProps) => {
  const { data: gifticonData } = useGETGifticonQuery({ goalId });

  const [gifticonURL, setGifticonURL] = useState('');

  // 1. 기프티콘 정보 가져오기
  useEffect(() => {
    if (!gifticonData?.data) return;

    setGifticonURL(gifticonData.data.gifticonURL);
  }, [gifticonData]);

  // USER INTERACTION
  // 1. 기프티콘 다운로드
  const imageRef = useRef<HTMLDivElement>(null);

  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  return { gifticonURL, imageRef, onClickDownload };
};

export default useHandleGifticonPage;
