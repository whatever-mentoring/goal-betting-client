import { usePOSTMediaFileMutation } from '@/app/common/api/media';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import Icon from '@/app/common/ui/assets/Icon';
import {
  fixedButtonOverWrapper,
  headerTextWrapper,
  withPreWrapCenter,
} from '@/app/common/ui/common.css';
import Image from 'next/image';
import React, { MouseEvent, memo, useRef, useState } from 'react';
import { ChallengeCertificationFunnelProps } from '../../challenge/[goalId]/page';
import { certificationPageStyles } from './certification.css';

interface ChallengeAddPageProps extends ChallengeCertificationFunnelProps {}

const CertificationPage = ({ certification, setCertification, onNext }: ChallengeAddPageProps) => {
  // USER INTERACTION
  // 1. 유저 > 이미지 업로드 & 삭제
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 1-1. 이미지 업로드
  const onClickAdd = () => {
    inputRef.current?.click();
  };

  const { mutate } = usePOSTMediaFileMutation({
    onSuccess: (data) => {
      setCertification((prev) => ({ ...prev, imageSrc: data.data }));
    },
  });

  const onInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    if (!file) return;
    mutate({ postData: { multipartFile: file } });
    setCertification((prev) => ({ ...prev, file }));
  };

  // 1-2. 이미지 삭제
  const onRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCertification((prev) => ({ ...prev, file: null }));
  };

  // 1-3. 이미지 업로드 씬에서 파일 존재 여부
  const isFileExist = !!certification.imageSrc;

  // 3. 유저 > 다음으로
  const isAllFilled = isFileExist;

  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'다짐을 인증해줘!'}</Text.TitleH1>
      </div>
      {/** 이미지 업로드 */}
      <div onClick={onClickAdd} className={certificationPageStyles.inputImageWrapper}>
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          value={inputValue}
          onChange={onInputImage}
          onClick={() => setInputValue('')}
          className={certificationPageStyles.inputImage}
        />
        {!isFileExist && (
          <div className={certificationPageStyles.imageUploadBox}>
            <Icon name="camera" fill="grey600" size="l" />
            <Text.BodyL color="grey500">사진 넣기</Text.BodyL>
          </div>
        )}
        {isFileExist && (
          <>
            <ButtonWrapper
              onClick={onRemoveImage}
              className={certificationPageStyles.closeIconWrapper}
            >
              <Icon name="close" fill="white" size="l" />
            </ButtonWrapper>
            <div className={certificationPageStyles.imageWrapper}>
              <MemoImage
                src={certification.imageSrc ? certification.imageSrc : ''}
                alt="certification-image"
              />
            </div>
          </>
        )}
      </div>
      <TextArea>
        <div className={certificationPageStyles.textAreaWrapper}>
          <TextArea.Base
            placeholder="오늘 다짐을 진행하면서&#10;어떤 일이 있었나요?"
            value={certification.text}
            onChange={(e) => setCertification((prev) => ({ ...prev, text: e.target.value }))}
            minRows={4}
            rows={4}
            maxRows={5}
            withCount={{ max: 200, initialVisible: true }}
          />
        </div>
      </TextArea>
      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper onClick={onNext}>
            <Text.BodyM color="grey500">다짐을 인증할 메세지를 적어주세요</Text.BodyM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First disabled={!isAllFilled} onClick={onNext} color="purple500-active">
          <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>작성완료</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default CertificationPage;

interface MemoImageProps {
  src: string;
  alt: string;
}

const MemoImage = memo(({ src, alt }: MemoImageProps) => (
  <Image
    key="image"
    alt={alt}
    fill
    objectFit="cover"
    className={certificationPageStyles.image}
    src={src}
  />
));
