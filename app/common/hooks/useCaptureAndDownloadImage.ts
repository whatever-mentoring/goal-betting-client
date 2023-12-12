import { saveAs } from 'file-saver';
import html2canvas from 'html2canvas';
import { RefObject } from 'react';

const useCaptureAndDownloadImage = (ref: RefObject<HTMLElement>) => {
  const captureAndDownload = async (filename: string = 'download.png') => {
    if (ref.current) {
      const canvas = await html2canvas(ref.current);
      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, filename);
        }
      });
    }
  };

  return { captureAndDownload };
};

export default useCaptureAndDownloadImage;
