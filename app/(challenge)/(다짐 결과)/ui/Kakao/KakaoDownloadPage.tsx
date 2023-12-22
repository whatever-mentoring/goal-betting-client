import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import Image from 'next/image';
import { useRef } from 'react';
import { ChallengeResultFunnel } from '../../result/[goalId]/page';
import { kakaoPageStyles } from './kakao.css';

type OmitOnNext = Omit<ChallengeResultFunnel, 'onNext'>;
interface SaverPageProps extends OmitOnNext {}

const KakaoDownloadPage = ({}: SaverPageProps) => {
  const imageRef = useRef<HTMLDivElement>(null);

  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  return (
    <>
      <Header showBackButton backTo={navigationPath.홈_페이지} />
      <div className={kakaoPageStyles.headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'기프티콘을\n저장해주세요'}</Text.TitleH1>
      </div>

      <div className={kakaoPageStyles.imageDownloadWrapper} ref={imageRef}>
        <div className={kakaoPageStyles.imageWrapper}>
          <Image
            className={kakaoPageStyles.image}
            src="/images/dog.png"
            alt="Image description"
            fill
            quality={100}
            priority
          />
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

export default KakaoDownloadPage;
