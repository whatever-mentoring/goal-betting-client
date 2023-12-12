import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Header from '@/app/common/ui/Header/Header';
import Text from '@/app/common/ui/Text/Text';
import TextArea from '@/app/common/ui/TextArea/TextArea';
import { headerTextWrapper } from '@/app/common/ui/common.css';
import React from 'react';
import { LoginFunnelProps } from '../../page';
import { nicknamePageStyles } from './nickname.css';

interface NicknamePageProps extends LoginFunnelProps {}

const NicknamePage = ({ user, setUser, onNext }: NicknamePageProps) => {
  // USER INTERACTION
  // 1. 유저 > 닉네임 입력
  const onChangeNickname = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUser((prev) => ({ ...prev, nickname: e.target.value }));
  };

  // 2. 유저 > 다음으로
  const isAllFilled = user.nickname.length > 0;
  return (
    <>
      <Header showBackButton />
      <div className={headerTextWrapper}>
        <Text.TitleH1>너는 이름이 뭐야?</Text.TitleH1>
      </div>
      <div className={nicknamePageStyles.inputWrapper}>
        <TextArea>
          <TextArea.Base
            placeholder="이름을 입력해주세요"
            value={user.nickname}
            onChange={onChangeNickname}
            maxLine={2}
            withCount={{
              max: 7,
            }}
          />
        </TextArea>
      </div>
      <BottomFixedButton>
        <BottomFixedButton.First
          disabled={!isAllFilled}
          color="purple500-active"
          width={100}
          onClick={onNext}
        >
          <Text.ButtonL color={isAllFilled ? 'white' : 'grey400'}>다음으로</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default NicknamePage;
