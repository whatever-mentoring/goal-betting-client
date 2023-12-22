import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import {
  fixedButtonOverWrapper,
  headerTextWrapper,
  withPreWrapCenter,
  withPreWrapStart,
} from '@/app/common/ui/common.css';
import Image from 'next/image';
import { ChallengeCertificationFunnelProps } from '../../challenge/[goalId]/certificate/page';
import useHandleCertificate from '../../module/certificate/useHandleCertificate';
import { checkPageStyles } from './check.css';

interface ChallengeAddPageProps extends ChallengeCertificationFunnelProps {
  onNext: () => (certificationId: number) => string;
  params: {
    goalId: number;
  };
}

const CheckPage = ({ certification, onNext, params }: ChallengeAddPageProps) => {
  const { onClickSubmit } = useHandleCertificate({ certification, goalId: params.goalId, onNext });

  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'다짐을 인증해줘!'}</Text.TitleH1>
      </div>
      <div className={checkPageStyles.inputImageWrapper}>
        <>
          <div className={checkPageStyles.imageWrapper}>
            <Image
              alt="image"
              fill
              priority
              className={checkPageStyles.image}
              src={certification.imageSrc ? certification.imageSrc : '/images/dog.png'}
            />
          </div>
        </>
      </div>
      <TextArea>
        <div className={checkPageStyles.textAreaWrapper}>
          <div className={checkPageStyles.textWrapper}>
            <Text.BodyM color="white" className={withPreWrapStart}>
              {certification.text}
            </Text.BodyM>
          </div>
          <div className={checkPageStyles.textCount}>
            <Text.BodyM color="grey600">{`${certification.text.length}/200`}</Text.BodyM>
          </div>
        </div>
      </TextArea>
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper onClick={onNext}>
            <Text.BodyM color="grey500">메시지는 추후에 수정할 수 없어요</Text.BodyM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First onClick={onClickSubmit} color="purple500-active">
          <Text.ButtonL color={'white'}>결과보기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default CheckPage;
