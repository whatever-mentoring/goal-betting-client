import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import {
  fixedButtonOverWrapper,
  headerTextWrapper,
  withPreWrapCenter,
} from '@/app/common/ui/common.css';
import dayjs from 'dayjs';
import Image from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import { previewPageStyles } from './preview.css';

interface PreviewPageProps extends ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const PreviewPage = ({ challenge, onNext }: PreviewPageProps) => {
  // TODO : 추후 새로고침 여부에 따라 첫 화면으로 넘길 것
  const title = challenge.title ?? '한달동안 3kg 감량할거야';
  const startDate = challenge.startDate ?? dayjs();

  const get7DayPeriodText = () => {
    const endDate = startDate.add(7, 'day');
    return `${startDate.format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
  };

  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>
          {'이렇게 내기할까?\n등록이 완료되면\n친구에게 공유할 수 있어'}
        </Text.TitleH1>
      </div>
      <div className={previewPageStyles.boxWrapper}>
        <div className={previewPageStyles.imageWrapper}>
          <Image
            src="/images/dog.png"
            layout="fill"
            alt="challenge-info"
            className={previewPageStyles.image}
          />
        </div>
        <div className={previewPageStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{get7DayPeriodText()}</Text.BodyS>
        </div>
      </div>
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <Text.BodyM color="white">지금 등록하면 수정할 수 없어요!</Text.BodyM>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First width={100} onClick={onNext}>
          <Text.ButtonL>내기 등록 완료하기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default PreviewPage;
