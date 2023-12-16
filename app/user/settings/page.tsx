'use client';
import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import ButtonWrapper from '@/app/common/ui/Button/ButtonWrapper';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { fixedButtonOverWrapper } from '@/app/common/ui/common.css';
import { useState } from 'react';
import { settingsPageStyles } from './settings.css';

interface Input {
  nickname: {
    disabled: boolean;
    value: string;
  };
  email: {
    disabled: boolean;
    value: string;
  };
}

const page = () => {
  const nickname = '용용';
  const email = 'wshmin1234@gmail.com';
  const [input, setInput] = useState<Input>({
    nickname: {
      disabled: true,
      value: nickname,
    },
    email: {
      disabled: true,
      value: email,
    },
  });

  const onToggleInput = (key: keyof Input) => {
    setInput((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        disabled: !prev[key].disabled,
      },
    }));
  };

  const onChangeInput = (key: keyof Input, value: string) => {
    setInput((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        value,
      },
    }));
  };

  return (
    <>
      <Header showBackButton />
      <div className={settingsPageStyles.container}>
        <div className={settingsPageStyles.headerTextWrapper}>
          <Text.TitleH2 color="cyan300">{nickname}</Text.TitleH2>
          <Text.TitleH2 color="white">님</Text.TitleH2>
        </div>

        <TextArea>
          <div className={settingsPageStyles.textAreaWrapper}>
            <div className={settingsPageStyles.textAreaDescriptionAndButtonWrapper}>
              <Text.BodyS color="white">닉네임</Text.BodyS>
              <ButtonWrapper onClick={() => onToggleInput('nickname')}>
                <Text.ButtonM color="grey400">변경</Text.ButtonM>
              </ButtonWrapper>
            </div>
            <TextArea.Base
              value={input.nickname.value}
              onChange={(e) => onChangeInput('nickname', e.target.value)}
              maxRows={1}
              disabled={input.nickname.disabled}
              withCount={{
                max: 7,
                initialVisible: true,
              }}
            />
          </div>
        </TextArea>
        <TextArea>
          <div className={settingsPageStyles.textAreaWrapper}>
            <div className={settingsPageStyles.textAreaDescriptionAndButtonWrapper}>
              <Text.BodyS color="white">이메일</Text.BodyS>
              <ButtonWrapper onClick={() => onToggleInput('email')}>
                <Text.ButtonM color="grey400">변경</Text.ButtonM>
              </ButtonWrapper>
            </div>
            <TextArea.Base
              value={input.email.value}
              onChange={(e) => onChangeInput('email', e.target.value)}
              disabled={input.email.disabled}
              withCount={{
                max: 50,
                initialVisible: true,
              }}
            />
          </div>
        </TextArea>
      </div>

      <BottomFixedButton>
        <BottomFixedButton.OverItem className={fixedButtonOverWrapper}>
          <ButtonWrapper>
            <Text.ButtonM color="grey400">회원 탈퇴</Text.ButtonM>
          </ButtonWrapper>
        </BottomFixedButton.OverItem>
        <BottomFixedButton.First color="grey800-active">
          <Text.ButtonL color="grey500">로그아웃</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default page;
