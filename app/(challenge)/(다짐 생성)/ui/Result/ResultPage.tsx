import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import Icon, { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { fixedButtonOverWrapper, underLineText } from '@/app/common/ui/common.css';
import { getDayPeriodToText, getLeftDaysFromToday } from '@/app/common/util/date';
import Image from 'next/image';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import { resultPageStyles } from './result.css';

interface ResultPageProps extends ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const ResultPage = ({ challenge, onNext }: ResultPageProps) => {
  // TODO : 추후 새로고침 여부에 따라 첫 화면으로 넘길 것
  const title = challenge.title || '한달동안 3kg 감량할거야';
  const startDate = challenge.startDate || new Date();

  // UI RENDER
  const getLeftDate = () => {
    getLeftDaysFromToday(startDate);
  };

  // USER INTERACTION
  // 1. 유저 > 상단 헤더 메뉴 클릭
  const { openDrawer } = useDrawer();
  // 1. 유저 > 이미지 다운로드
  // 1-1. 이미지 생성
  const imageRef = useRef<HTMLDivElement>(null);
  // 1-2. 이미지 다운로드
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload(title);
  };

  // 2. 유저 > 공유하기
  const { triggerShare } = useTriggerShare();

  const onClickShare = () => {
    triggerShare({ title, text: '내기 등록 완료!', url: location.href });
  };

  return (
    <>
      <Header
        appendingRightButton={<ButtonIcon onClick={openDrawer} name="menu" fill="white" size="l" />}
      />
      <div className={resultPageStyles.dateLeftWrapper}>
        <div className={resultPageStyles.dateLeftBox}>
          <Text.BodyM color="white">{`D-${getLeftDate()}`}</Text.BodyM>
        </div>
      </div>
      <div ref={imageRef} className={resultPageStyles.boxWrapper}>
        <div className={resultPageStyles.imageWrapper}>
          <Image
            src="/images/dog.png"
            fill
            alt="challenge-info"
            priority
            className={resultPageStyles.image}
          />
        </div>
        <div className={resultPageStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{getDayPeriodToText(startDate, 7)}</Text.BodyS>
        </div>
      </div>
      <div className={resultPageStyles.downloadWrapper}>
        <ButtonWrapper onClick={onClickDownload} className={resultPageStyles.downloadButton}>
          <Icon name="download" fill="white" size="l" />
          <Text.BodyM color="white">다운로드</Text.BodyM>
        </ButtonWrapper>
      </div>
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper onClick={onNext}>
            <Text.BodyM className={underLineText} color="grey500">
              임시 내기 페이지로 이동
            </Text.BodyM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First width={100} onClick={onClickShare}>
          <Text.ButtonL>링크 보내기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ResultPage;
