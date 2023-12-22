import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import Image from 'next/image';
import useHandleSavePage from '../../module/result/useHandleSavePage';
import { ChallengeResultFunnel } from '../../result/[goalId]/page';
import { savePageStyles } from './save.css';

type OmitOnNext = Omit<ChallengeResultFunnel, 'onNext'>;
interface SaverPageProps extends OmitOnNext {
  goalId: number;
}

const SavePage = ({ goalId }: SaverPageProps) => {
  const { imageRef, challengeInfo, onClickDownload } = useHandleSavePage({ goalId });

  return (
    <>
      <Header showBackButton backTo={navigationPath.홈_페이지} />

      <div className={savePageStyles.headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'다음에는\n기프티콘 회수해보자'}</Text.TitleH1>
      </div>

      <div className={savePageStyles.boxCanvas}>
        <div ref={imageRef} className={savePageStyles.boxWrapper}>
          <div className={savePageStyles.imageWrapper}>
            <Image
              src={'/images/dog.png'}
              fill
              alt="mirr character"
              priority
              className={savePageStyles.image}
            />
          </div>
          <div className={savePageStyles.challengeTextWrapper}>
            <Text.BodyL>{challengeInfo.title}</Text.BodyL>
            <Text.BodyS color="grey400">{challengeInfo.periodText}</Text.BodyS>
          </div>
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
