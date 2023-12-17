'use client';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, useState } from 'react';
import { extractNonEmptyArrayKeys } from '../common/hooks/funnel/models';
import { useFunnel } from '../common/hooks/funnel/useFunnel';
import navigationPath from '../common/navigation/navigationPath';
import LoginPage from './ui/Login/LoginPage';
import NicknamePage from './ui/Nickname/NicknamePage';

export interface LoginFunnelProps {
  user: User;
  setUser: Dispatch<SetStateAction<User>>;
  onNext: () => void;
}

interface User {
  nickname: string;
}

const LoginFunnel = () => {
  const router = useRouter();
  const [Funnel, setStep] = useFunnel(extractNonEmptyArrayKeys(navigationPath.로그인_퍼널));

  const [user, setUser] = useState<User>({
    nickname: '빛나는 청룡',
  });

  return (
    <Funnel>
      <Funnel.Step name="로그인">
        <LoginPage onNext={() => setStep('닉네임_설정')} />
      </Funnel.Step>
      <Funnel.Step name="닉네임_설정">
        <NicknamePage
          user={user}
          setUser={setUser}
          onNext={() => router.push(navigationPath.다짐_생성_퍼널.다짐_입력, { scroll: false })}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default LoginFunnel;
