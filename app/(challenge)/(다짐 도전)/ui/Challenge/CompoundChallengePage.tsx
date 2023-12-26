import { BallImage } from '@/app/common/constants/ballImage';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Label from '@/app/common/ui/Label/Label';
import Text from '@/app/common/ui/Text/Text';
import Image from 'next/image';
import { ReactNode } from 'react';
import { CertificateInfo } from '../../module/challenge/useHandleChallengePage';
import { challengePageStyles } from './challenge.css';

interface CompoundChallengePageProps {
  children: ReactNode;
}

const CompoundChallengePage = ({ children }: CompoundChallengePageProps) => {
  return (
    <>
      {children}
      <div className={challengePageStyles.fixedBox}></div>
    </>
  );
};

export default CompoundChallengePage;

interface labelProps {
  children: ReactNode;
}

const Labels = ({ children }: labelProps) => {
  return (
    <>
      <div className={challengePageStyles.labelWrapper}>{children}</div>
    </>
  );
};

Labels.Item = Label;

interface ChallengeInfoProps {
  title: string;
  periodText: string;
}

const ChallengeInfo = ({ title, periodText }: ChallengeInfoProps) => {
  return (
    <>
      <div className={challengePageStyles.headerTextWrapper}>
        <Text.TitleH2>{title}</Text.TitleH2>
        <Text.BodyS color="grey400">{periodText}</Text.BodyS>
      </div>
    </>
  );
};

interface ChallengeMainImagesProps {
  src: string;
  alt: string;
}

const ChallengeMainImage = ({ src, alt }: ChallengeMainImagesProps) => {
  return (
    <div className={challengePageStyles.mainImageWrapper}>
      <div className={challengePageStyles.mainImageBox}>
        <Image
          className={challengePageStyles.image}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 480px) 100px, 200px"
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

interface ChallengeBallImagesProps {
  images: BallImage[];
  certificationList: CertificateInfo[];
  onClickCertificate: (progressDay: number) => void;
  onClickAddNewChallenge: () => void;
}

const ChallengeBallImages = ({
  images,
  certificationList,
  onClickCertificate,
  onClickAddNewChallenge,
}: ChallengeBallImagesProps) => {
  return (
    <div className={challengePageStyles.gridContainer}>
      {images.map((image) => {
        const isCertificated = certificationList.find(
          (certification) => certification.progressDay === image.id,
        );
        return (
          <div
            style={{ cursor: isCertificated ? 'pointer' : '' }}
            key={image.id}
            className={challengePageStyles.gridItem}
            onClick={() => {
              isCertificated && onClickCertificate(isCertificated.bettingId);
            }}
          >
            <Image
              className={challengePageStyles.image}
              src={isCertificated ? image.onImgSrc : image.offImgSrc}
              alt="Challenge Ball Image"
              width={100}
              height={100}
              sizes="(max-width: 768px) 100px, 200px"
              priority
            />
            <div className={challengePageStyles.imageLabel}>
              <Text.ButtonM color="white">{image.text}</Text.ButtonM>
            </div>
          </div>
        );
      })}
      <div onClick={onClickAddNewChallenge} className={challengePageStyles.gridItem}>
        <div className={challengePageStyles.blankBox}>
          <Text.BodyL color="white">+</Text.BodyL>
        </div>
        <div className={challengePageStyles.imageLabel}>
          <Text.ButtonM color="white">새 다짐</Text.ButtonM>
        </div>
      </div>
    </div>
  );
};

interface LinkButtonProps {
  onClick: () => void;
  buttonText: string;
}

const LinkButton = ({ onClick, buttonText }: LinkButtonProps) => {
  return (
    <div className={challengePageStyles.userCountWrapper}>
      <ButtonWrapper onClick={onClick} className={challengePageStyles.textButtonStyles}>
        <Text.BodyS color="grey300">{buttonText}</Text.BodyS>
      </ButtonWrapper>
    </div>
  );
};

interface BottomFixedButtonProps {
  buttonText: string;
  onClick: () => void;
}

const NavigateFixedButton = ({ buttonText, onClick }: BottomFixedButtonProps) => {
  return (
    <BottomFixedButton>
      <BottomFixedButton.First onClick={onClick}>
        <Text.ButtonL>{buttonText}</Text.ButtonL>
      </BottomFixedButton.First>
    </BottomFixedButton>
  );
};

CompoundChallengePage.Labels = Labels;
CompoundChallengePage.ChallengeInfo = ChallengeInfo;
CompoundChallengePage.MainImage = ChallengeMainImage;
CompoundChallengePage.BallImages = ChallengeBallImages;
CompoundChallengePage.LinkButton = LinkButton;
CompoundChallengePage.NavigateFixedButton = NavigateFixedButton;
