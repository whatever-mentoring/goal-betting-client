import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Label from '@/app/common/ui/Label/Label';
import Text from '@/app/common/ui/Text/Text';
import Icon from '@/app/common/ui/assets/Icon';
import { fixedButtonOverWrapper } from '@/app/common/ui/common.css';
import Image from 'next/image';
import { ForwardRefRenderFunction, HTMLAttributes, ReactNode, forwardRef } from 'react';
import { sharePageStyles } from './share.css';

interface CompoundSharePageProps {
  children: ReactNode;
}

const CompoundSharePage = ({ children }: CompoundSharePageProps) => {
  return <>{children}</>;
};

export default CompoundSharePage;

interface BannerProps {
  children: ReactNode;
}

const Banner = ({ children }: BannerProps) => {
  return (
    <>
      <div className={sharePageStyles.labelWrapper}>{children}</div>
    </>
  );
};

Banner.Item = Label;

type ImageCardProps = {
  src: string;
  alt: string;
  title: string;
  periodText: string;
} & HTMLAttributes<HTMLDivElement>;

const ImageCard: ForwardRefRenderFunction<HTMLDivElement, ImageCardProps> = (
  { src, alt, title, periodText, ...rest },
  forwardRef,
) => {
  return (
    <div className={sharePageStyles.boxCanvas}>
      <div ref={forwardRef} {...rest} className={sharePageStyles.boxWrapper}>
        <div className={sharePageStyles.imageWrapper}>
          <Image src={src} fill alt={alt} priority className={sharePageStyles.image} />
        </div>
        <div className={sharePageStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{periodText}</Text.BodyS>
        </div>
      </div>
    </div>
  );
};

interface DownloadButtonProps {
  onClick: () => void;
}

const DownloadButton = ({ onClick }: DownloadButtonProps) => {
  return (
    <div className={sharePageStyles.downloadWrapper}>
      <ButtonWrapper onClick={onClick} className={sharePageStyles.downloadButton}>
        <Icon name="download" fill="white" size="l" />
        <Text.BodyM color="white">다운로드</Text.BodyM>
      </ButtonWrapper>
    </div>
  );
};

interface ShareButtonProps {
  onClick: () => void;
}

const ShareButton = ({ onClick }: ShareButtonProps) => {
  return (
    <BottomFixedButton>
      <BottomFixedButton.First width={100} onClick={onClick}>
        <Text.ButtonL>링크 보내기</Text.ButtonL>
      </BottomFixedButton.First>
    </BottomFixedButton>
  );
};

export interface ParticipateButtonProps {
  overItemText: string;
  buttonText: string;
  onClick: () => void;
  onClickOverItem: () => void;
}

const ParticipateButtonWithOverItem = ({
  overItemText,
  buttonText,
  onClick,
  onClickOverItem,
}: ParticipateButtonProps) => {
  return (
    <BottomFixedButton>
      <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
        <ButtonWrapper onClick={onClickOverItem}>
          <Text.BodyM color="white">{overItemText}</Text.BodyM>
        </ButtonWrapper>
      </BottomFixedButton.OverItem>
      <BottomFixedButton.First width={100} onClick={onClick}>
        <Text.ButtonL>{buttonText}</Text.ButtonL>
      </BottomFixedButton.First>
    </BottomFixedButton>
  );
};

CompoundSharePage.Banner = Banner;
CompoundSharePage.ImageCard = forwardRef(ImageCard);
CompoundSharePage.DownloadButton = DownloadButton;
CompoundSharePage.ShareButton = ShareButton;
CompoundSharePage.ParticipateButtonWithOverItem = ParticipateButtonWithOverItem;
