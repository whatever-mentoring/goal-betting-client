import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useDeviceDetect from '@/app/common/hooks/useDeviceDetect';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import Icon, { ButtonIcon } from '@/app/common/ui/assets/Icon';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import Image from 'next/image';
import { Dispatch, SetStateAction, useRef } from 'react';
import { Challenge, ChallengeFunnelProps } from '../../add/page';
import { resultPageStyles } from './result.css';

dayjs.locale('ko');

interface ResultPageProps extends ChallengeFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const ResultPage = ({ challenge }: ResultPageProps) => {
  // TODO : 추후 새로고침 여부에 따라 첫 화면으로 넘길 것
  const title = challenge.title || '한달동안 3kg 감량할거야';
  const startDate = challenge.startDate || dayjs();

  // UI RENDER
  const getLeftDate = () => {
    const today = dayjs();
    return startDate.diff(today, 'day');
  };

  const get7DayPeriodText = () => {
    const endDate = startDate.add(7, 'day');
    return `${startDate.format('YYYY.MM.DD')} ~ ${endDate.format('YYYY.MM.DD')}`;
  };

  // USER INTERACTION
  // 1. 유저 > 이미지 다운로드
  // 1-1. 이미지 생성
  const imageRef = useRef<HTMLDivElement>(null);
  // 1-2. 이미지 다운로드
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload(title);
  };

  // 2. 유저 > 공유하기
  const { isMobile } = useDeviceDetect();
  const { triggerShare } = useTriggerShare();

  const onClickShare = async () => {
    if (isMobile) {
      triggerShare({ title, text: '내기 등록 완료!', url: location.href });
      return;
    }
    await navigator.clipboard.writeText(location.href);
    alert('링크가 복사되었습니다.');
  };

  return (
    <>
      <Header appendingRightButton={<ButtonIcon name="menu" fill="white" size="l" />} />
      <div className={resultPageStyles.dateLeftWrapper}>
        <div className={resultPageStyles.dateLeftBox}>
          <Text.BodyM color="white">{`D-${getLeftDate()}`}</Text.BodyM>
        </div>
      </div>
      <div ref={imageRef} className={resultPageStyles.boxWrapper}>
        <div className={resultPageStyles.imageWrapper}>
          <Image
            src="/images/dog.png"
            layout="fill"
            alt="challenge-info"
            className={resultPageStyles.image}
          />
        </div>
        <div className={resultPageStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{get7DayPeriodText()}</Text.BodyS>
        </div>
      </div>
      <div className={resultPageStyles.downloadWrapper}>
        <ButtonWrapper onClick={onClickDownload} className={resultPageStyles.downloadButton}>
          <Icon name="download" fill="white" size="l" />
          <Text.BodyM color="white">다운로드</Text.BodyM>
        </ButtonWrapper>
      </div>
      <BottomFixedButton>
        <BottomFixedButton.First width={100} onClick={onClickShare}>
          <Text.ButtonL>링크 보내기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default ResultPage;
