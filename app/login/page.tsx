'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
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
  const params = useSearchParams();
  const memoStep = useMemo(() => extractNonEmptyArrayKeys(navigationPath.로그인_퍼널), []);
  const [Funnel, setStep] = useFunnel(memoStep);

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
          onNext={() => {
            if (params.get('callback')) {
              router.replace(params.get('callback') as string, { scroll: false });
            } else {
              router.replace(navigationPath.다짐_생성_퍼널.다짐_입력, { scroll: false });
            }
          }}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default LoginFunnel;
