import Image from 'next/image';
import { ForwardRefRenderFunction, HTMLAttributes, forwardRef } from 'react';
import Text from '../Text/Text';
import { imageCardStyles } from './imageCard.css';

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
    <div className={imageCardStyles.boxCanvas}>
      <div ref={forwardRef} {...rest} className={imageCardStyles.boxWrapper}>
        <div className={imageCardStyles.imageWrapper}>
          <Image
            src={src}
            fill
            alt={alt}
            priority
            className={imageCardStyles.image}
            sizes="(max-width: 480px) 380px, (max-width: 768px) 480px, 768px"
          />
        </div>
        <div className={imageCardStyles.challengeTextWrapper}>
          <Text.BodyL>{title}</Text.BodyL>
          <Text.BodyS color="grey400">{periodText}</Text.BodyS>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(ImageCard);
