import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import Image from 'next/image';
import { useRef } from 'react';
import { ChallengeResultFunnel } from '../../page';
import { savePageStyles } from './save.css';

type OmitOnNext = Omit<ChallengeResultFunnel, 'onNext'>;
interface SaverPageProps extends OmitOnNext {}

const SavePage = ({ user }: SaverPageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);
  // 1-2. 이미지 다운로드
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  const images = [
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
    '/images/dog.png',
  ];

  const getHeaderText = () => {
    if (user.type === 'challenger' && user.isSuccess) {
      return '7일 동안 고생했어!';
    }
    return '다음에는\n기프티콘 회수해보자';
  };

  return (
    <>
      <Header showBackButton backTo={navigationPath.다짐_도전_퍼널.다짐_도전} />

      <div className={savePageStyles.headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{getHeaderText()}</Text.TitleH1>
      </div>

      <div className={savePageStyles.allImageWrapper} ref={imageRef}>
        <div className={savePageStyles.mainImageWrapper}>
          <div className={savePageStyles.mainImageBox}>
            <Image
              className={savePageStyles.image}
              src="/images/dog.png"
              alt="Image description"
              fill
              quality={100}
              priority
            />
          </div>
        </div>
        <div className={savePageStyles.gridContainer}>
          {images.slice(0, 4).map((image, idx) => (
            <div key={`${image + idx}`} className={savePageStyles.gridItem}>
              <Image
                className={savePageStyles.image}
                src={image}
                alt="Image description"
                width={100}
                height={100}
                priority
              />
            </div>
          ))}
        </div>
        <div className={savePageStyles.gridSecondRow}>
          {images.slice(4).map((image, idx) => (
            <div key={`${image + idx}`} className={savePageStyles.gridItem}>
              <Image
                className={savePageStyles.image}
                src={image}
                alt="Image description"
                width={100}
                height={100}
                priority
              />
            </div>
          ))}
        </div>
      </div>

      <BottomFixedButton>
        <BottomFixedButton.First onClick={onClickDownload} color="purple500-active">
          <Text.ButtonL color={'white'}>다운로드하기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default SavePage;
