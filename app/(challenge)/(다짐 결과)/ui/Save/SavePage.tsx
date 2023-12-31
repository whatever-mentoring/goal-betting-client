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
  const { isChallengeSuccess, imageRef, challengeInfo, onClickDownload, getHeaderText } =
    useHandleSavePage({ goalId });

  return (
    <>
      <Header showBackButton backTo={navigationPath.홈_페이지} />

      <div className={savePageStyles.headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>
          {getHeaderText(isChallengeSuccess)}
        </Text.TitleH1>
      </div>

      <div className={savePageStyles.boxCanvas}>
        <div ref={imageRef} className={savePageStyles.boxWrapper}>
          <div className={savePageStyles.imageWrapper}>
            <Image
              src={'/images/mirr/mirr_2.png'}
              fill
              alt="mirr character"
              priority
              className={savePageStyles.image}
              sizes="(max-width: 480px) 152px 186px"
            />
          </div>
          <div className={savePageStyles.challengeTextWrapper}>
            <Text.TitleH2>{challengeInfo.title}</Text.TitleH2>
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
