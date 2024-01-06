import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import Image from 'next/image';
import useHandleGifticonPage from '../../module/gifticon/useHandleGifticonPage';
import { ChallengeResultFunnel } from '../../result/[goalId]/page';
import { kakaoPageStyles } from './gifticon.css';

type OmitOnNext = Omit<ChallengeResultFunnel, 'onNext'>;
interface SaverPageProps extends OmitOnNext {
  goalId: number;
}

const GifticonDownloadPage = ({ goalId }: SaverPageProps) => {
  const { gifticonURL, imageRef, onClickDownload } = useHandleGifticonPage({ goalId });

  return (
    <>
      <Header showBackButton backTo={navigationPath.다짐_페이지(goalId)} />
      <div className={kakaoPageStyles.headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'기프티콘을 저장해보자'}</Text.TitleH1>
      </div>
      <div className={kakaoPageStyles.imageDownloadWrapper} ref={imageRef}>
        <div className={kakaoPageStyles.imageWrapper}>
          {!!gifticonURL && (
            <Image
              className={kakaoPageStyles.image}
              src={gifticonURL}
              alt="Image description"
              width={0}
              height={0}
              quality={100}
              priority
              sizes="100vw"
            />
          )}
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

export default GifticonDownloadPage;
