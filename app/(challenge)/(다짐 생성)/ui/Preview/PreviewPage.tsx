import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ImageCard from '@/app/common/ui/Card/ImageCard';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import {
  fixedButtonOverWrapper,
  headerTextWrapper,
  withPreWrapCenter,
} from '@/app/common/ui/common.css';
import { getDayPeriodToText } from '@/app/common/util/date';
import classNames from 'classnames';
import { Dispatch, SetStateAction } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import useHandlePreview from '../../module/preview/useHandlePreview';
import { previewPageStyles } from './preview.css';

type OmitOnNext = Omit<ChallengeAddFunnelProps, 'onNext'>;
interface PreviewPageProps extends OmitOnNext {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const PreviewPage = ({ challenge }: PreviewPageProps) => {
  const { submit } = useHandlePreview({ challenge });

  const onClickSubmit = () => {
    submit();
  };

  return (
    <>
      <Header showBackButton />
      <div className={classNames(headerTextWrapper, previewPageStyles.headerTextWrapper)}>
        <Text.TitleH1 className={withPreWrapCenter}>{'이렇게 내기할까?'}</Text.TitleH1>
      </div>
      <ImageCard
        src="/images/mirr/mirr_happy.png"
        alt="mirr laugh character"
        periodText={getDayPeriodToText(challenge.startDate, 7)}
        title={challenge.title}
      />
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <Text.BodyS color="white">지금 등록하면 수정할 수 없어요!</Text.BodyS>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First width={100} onClick={onClickSubmit}>
          <Text.ButtonL>내기 등록 완료하기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default PreviewPage;
