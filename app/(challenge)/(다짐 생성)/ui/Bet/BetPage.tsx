import useDeviceDetect from '@/app/common/hooks/useDeviceDetect';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import Icon from '@/app/common/ui/assets/Icon';
import {
  fixedButtonOverWrapper,
  headerTextWrapper,
  withPreWrapCenter,
} from '@/app/common/ui/common.css';
import Link from 'next/link';
import React, { Dispatch, MouseEvent, SetStateAction, useRef, useState } from 'react';
import { Challenge, ChallengeAddFunnelProps } from '../../add/page';
import { betPageStyles } from './bet.css';

interface ChallengeAddPageProps extends ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
}

const BetPage = ({ challenge, setChallenge, onNext }: ChallengeAddPageProps) => {
  // USER INTERACTION
  // 1. 유저 > 이미지 업로드 & 삭제
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 1-1. 이미지 업로드
  const onClickAdd = () => {
    inputRef.current?.click();
  };

  const onInputImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];
    setChallenge((prev) => ({ ...prev, gifticon: { file } }));
  };

  // 1-2. 이미지 삭제
  const onRemoveImage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setChallenge((prev) => ({ ...prev, gifticon: { file: null } }));
  };

  // 1-3. 이미지 업로드 씬에서 파일 존재 여부
  const isFileExist = !!challenge.gifticon.file;

  // 2. 유저 > 카카오톡 기프티콘 사러가기
  const { isMobile } = useDeviceDetect();

  const getKakaoLink = () => {
    if (isMobile) return 'kakaotalk://gift';

    return 'https://gift.kakao.com/home';
  };

  // 3. 유저 > 다음으로
  const isAllFilled = isFileExist;

  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1 className={withPreWrapCenter}>{'그 다짐으로\n친구랑 내기할래?'}</Text.TitleH1>
      </div>
      {/** 이미지 업로드 */}
      <div onClick={onClickAdd} className={betPageStyles.inputImageWrapper}>
        <input
          ref={inputRef}
          type="file"
          name="image"
          accept="image/*"
          value={inputValue}
          onChange={onInputImage}
          onClick={() => setInputValue('')}
          className={betPageStyles.inputImage}
        />
        {!isFileExist && (
          <div className={betPageStyles.imageUploadBox}>
            <Icon name="camera" fill="grey600" size="l" />
            <Text.BodyL color="grey500">기프티콘 사진 넣기</Text.BodyL>
          </div>
        )}
        {isFileExist && (
          <>
            <ButtonWrapper onClick={onRemoveImage} className={betPageStyles.closeIconWrapper}>
              <Icon name="close" fill="white" size="l" />
            </ButtonWrapper>
            <div>
              <img
                className={betPageStyles.image}
                src={URL.createObjectURL(challenge.gifticon.file!)}
              />
            </div>
          </>
        )}
      </div>
      <div className={betPageStyles.imageUploadTextWrapper}>
        <Text.BodyS color="grey600" className={betPageStyles.imageUploadText}>
          {'만료/사용완료된 기프티콘 업로드 후 발생하는\n문제는 사용자 책임입니다.'}
        </Text.BodyS>
      </div>
      {!isFileExist && (
        <div className={betPageStyles.linkButtonWrapper}>
          <Link className={betPageStyles.linkButton} href={getKakaoLink()}>
            <Text.BodyM color="grey600">카카오톡으로 사러가기</Text.BodyM>
          </Link>
        </div>
      )}
      <BottomFixedButton>
        {!isFileExist && (
          <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
            <ButtonWrapper onClick={onNext}>
              <Text.BodyM className={betPageStyles.underLineText} color="grey700">
                안걸고 내기하기
              </Text.BodyM>
            </ButtonWrapper>
          </BottomFixedButton.OverItem>
        )}
        <BottomFixedButton.First disabled={!isAllFilled} onClick={onNext} color="purple500">
          <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>
            기프티콘 걸고 내기하기
          </Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default BetPage;
