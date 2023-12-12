import { useCallback } from 'react';
import useDeviceDetect from './useDeviceDetect';

interface ShareData {
  title: string;
  text?: string;
  url?: string;
  files?: File[];
}

const useTriggerShare = () => {
  const { isMobile } = useDeviceDetect();
  const triggerShare = useCallback(
    async (shareData: ShareData) => {
      const url = shareData.url ?? window.location.href;

      if (isMobile) {
        await navigator.share(shareData).catch((error) => {
          console.error('공유하기 에러', error);
        });
        return;
      }

      navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.');
    },
    [isMobile],
  );
  return { triggerShare };
};

export default useTriggerShare;
