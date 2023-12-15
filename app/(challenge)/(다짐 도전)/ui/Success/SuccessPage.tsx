import { ChallengerFunnelProps } from '@/app/(challenge)/(다짐 도전)/page';
import useCaptureAndDownloadImage from '@/app/common/hooks/useCaptureAndDownloadImage';
import useTriggerShare from '@/app/common/hooks/useTriggerShare';
import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRef } from 'react';
import { successPageStyles } from './success.css';

type OmitNextStep = Omit<ChallengerFunnelProps, 'onNext'>;
interface ChallengeAddPageProps extends OmitNextStep {}

const SuccessPage = ({ certification, setCertification }: ChallengeAddPageProps) => {
  // UI RENDER
  const startDate = dayjs().subtract(1, 'day');

  const getAfterDate = () => {
    const diff = dayjs().diff(startDate, 'day');
    return diff;
  };

  const getImageUrl = () => {
    if (!certification.file) return '';
    return URL.createObjectURL(certification.file);
  };
  // USER INTERACTION
  // 1. 사용자 > 뒤로가기
  const onClickBack = () => {
    // 데이터 초기화
    setCertification({
      text: '',
      file: null,
    });
  };

  // 2. 사용자 > 이미지 다운로드
  const imageRef = useRef<HTMLDivElement>(null);
  const { captureAndDownload } = useCaptureAndDownloadImage(imageRef);

  const onClickDownload = () => {
    captureAndDownload('다짐을 인증해줘!');
  };

  // 3. 사용자 > 공유하기
  const { triggerShare } = useTriggerShare();

  const onClickShare = () => {
    triggerShare({
      title: certification.text,
    });
  };

  return (
    <>
      <Header
        showBackButton
        backTo={navigationPath.다짐_도전_퍼널.다짐_도전}
        backCallback={onClickBack}
        appendingRightButton={
          <ButtonIcon name="share" fill="white" size="l" onClick={onClickShare} />
        }
      />
      <div className={successPageStyles.wrapper} ref={imageRef}>
        <div className={successPageStyles.dateLeftWrapper}>
          <div className={successPageStyles.dateLeftBox}>
            <Text.ButtonM color="white">{`${getAfterDate()}일차`}</Text.ButtonM>
          </div>
        </div>
        <div className={successPageStyles.headerTextWrapper}>
          <Text.TitleH1 className={withPreWrapCenter}>{'다짐을 인증해줘!'}</Text.TitleH1>
          <Text.BodyS className={withPreWrapCenter} color="grey400">
            {'2023.12.01'}
          </Text.BodyS>
        </div>
        <div className={successPageStyles.inputImageWrapper}>
          <div className={successPageStyles.imageWrapper}>
            <Image
              alt="image"
              width={100}
              height={100}
              layout="responsive"
              className={successPageStyles.image}
              priority
              src={getImageUrl()}
            />
          </div>
        </div>
        <div className={successPageStyles.textAreaWrapper}>
          <Text.BodyS className={withPreWrapCenter} color="white">
            {certification.text}
          </Text.BodyS>
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

export default SuccessPage;
