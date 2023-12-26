import { saveAs } from 'file-saver';
// import { toPng } from 'html-to-image';
import html2canvas from 'html2canvas';
import { RefObject } from 'react';
const useCaptureAndDownloadImage = (ref: RefObject<HTMLElement>) => {
  const captureAndDownload = async (filename: string = 'download.png') => {
    if (ref.current) {
      try {
        // 모든 요소에 대한 폰트 적용
        const all = ref.current.getElementsByTagName('*');
        for (let i = 0, max = all.length; i < max; i++) {
          const element = all[i] as HTMLElement;

          element.style.fontFamily = 'Pretendard-SemiBold';
        }

        const canvas = await html2canvas(ref.current, {
          useCORS: true,
          allowTaint: true,
          scale: 3,
          removeContainer: false,
          onclone: (document) => {
            // pretendard font 다운로드
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href =
              'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css';
            document.head.appendChild(link);

            const all = document.getElementsByTagName('*');
            for (let i = 0, max = all.length; i < max; i++) {
              const element = all[i] as HTMLElement;

              element.style.fontFamily = 'Pretendard';
              element.style.fontWeight = '700';
            }
          },
          backgroundColor: 'transparent',
        });
        canvas.toBlob((blob) => {
          if (blob) {
            saveAs(blob, filename);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { captureAndDownload };
};

export default useCaptureAndDownloadImage;
