'use client';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import { useDrawer } from '@/app/common/ui/Drawer/DrawerContext';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { fixedButtonOverWrapper } from '@/app/common/ui/common.css';
import { getDayPeriodToText } from '@/app/common/util/date';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import { sharePageStyles } from './share.css';

dayjs.locale('ko');

const ShareChallengePage = () => {
  const title = '한달동안 3kg 감량할거야';
  const startDate = dayjs();

  // UI RENDER
  const getLeftDate = () => {
    const today = dayjs();
    return startDate.diff(today, 'day');
  };

  // USER INTERACTION
  // 1. 유저 > 상단 헤더 메뉴 클릭
  const { openDrawer } = useDrawer();

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
      <div className={sharePageStyles.dateLeftWrapper}>
        <div className={sharePageStyles.dateLeftBox}>
          <Text.BodyM color="white">{`D-${getLeftDate()}`}</Text.BodyM>
        </div>
        <div className={sharePageStyles.gifiticonBox}>
          <Text.BodyM color="white">기프티콘</Text.BodyM>
        </div>
      </div>
      <div className={sharePageStyles.boxWrapper}>
        <div className={sharePageStyles.imageWrapper}>
          <Image
            src="/images/dog.png"
            fill
            alt="challenge-info"
            priority
            className={sharePageStyles.image}
          />
        </div>
        <div className={sharePageStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{getDayPeriodToText(startDate, 7)}</Text.BodyS>
        </div>
      </div>

      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper>
            <Text.BodyM color="white">여러명이 내기에 참여했어요</Text.BodyM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First width={100} onClick={onClickShare}>
          <Text.ButtonL>링크 보내기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ShareChallengePage;
