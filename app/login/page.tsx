'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useFunnel } from '../common/hooks/funnel/useFunnel';
import NicknamePage from './ui/Nickname/NicknamePage';
import { useRouter } from 'next/navigation';
import navigationPath from '../common/navigation/navigationPath';
import LoginPage from './ui/Login/LoginPage';

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
  const [Funnel, setStep] = useFunnel(['로그인', '닉네임_설정']);

  const [user, setUser] = useState<User>({
    nickname: '',
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
          onNext={() => router.push(navigationPath.다짐_입력_화면)}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default LoginFunnel;
