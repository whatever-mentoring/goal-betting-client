import navigationPath from '@/app/common/navigation/navigationPath';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Label from '@/app/common/ui/Label/Label';
import Text from '@/app/common/ui/Text/Text';
import { withPreWrapCenter } from '@/app/common/ui/common.css';
import Image from 'next/image';
import useHandleCertificateSuccess from '../../module/certificate/useHandleCertificateSuccess';
import { successPageStyles } from './success.css';

interface SuccessPageProps {
  goalId: number;
  goalProofId: number;
}

const SuccessPage = ({ goalId, goalProofId }: SuccessPageProps) => {
  const { certification, imageRef, onClickDownload } = useHandleCertificateSuccess({
    goalId,
    goalProofId,
  });
  return (
    <>
      <Header showBackButton backTo={navigationPath.홈_페이지} />
      <div className={successPageStyles.wrapper} ref={imageRef}>
        <div className={successPageStyles.dateLeftWrapper}>
          <Label {...certification.label} />
        </div>
        <div className={successPageStyles.headerTextWrapper}>
          <Text.TitleH2 className={withPreWrapCenter}>{certification.title}</Text.TitleH2>
          <Text.BodyS className={withPreWrapCenter} color="grey400">
            {certification.dateText}
          </Text.BodyS>
        </div>
        <div className={successPageStyles.inputImageWrapper}>
          <div className={successPageStyles.imageWrapper}>
            {certification.imgSrc && (
              <Image
                alt="image"
                width={100}
                height={100}
                layout="responsive"
                className={successPageStyles.image}
                priority
                src={certification.imgSrc}
              />
            )}
          </div>
        </div>
        <div className={successPageStyles.textAreaWrapper}>
          <Text.BodyS className={withPreWrapCenter} color="white">
            {certification.content}
          </Text.BodyS>
        </div>
      </div>

      <BottomFixedButton>
        <BottomFixedButton.First
          onClick={() => onClickDownload(certification.title)}
          color="purple500-active"
        >
          <Text.ButtonL color={'white'}>다운로드하기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default SuccessPage;
