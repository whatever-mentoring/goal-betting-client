import { saveAs } from 'file-saver';
import { toPng } from 'html-to-image';
import { RefObject } from 'react';

const useCaptureAndDownloadImage = (ref: RefObject<HTMLElement>) => {
  const captureAndDownload = async (filename: string = 'download.png') => {
    if (ref.current) {
      try {
        const link = await toPng(ref.current, {
          quality: 1,
          pixelRatio: 1,
          cacheBust: false,
        });
        saveAs(link, filename);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return { captureAndDownload };
};

export default useCaptureAndDownloadImage;
