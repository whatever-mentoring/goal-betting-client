import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Text from '@/app/common/ui/Text/Text';
import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { LoginFunnelProps } from '../../page';
import { loginPageStyles } from './login.css';

type LoginPageProps = Omit<LoginFunnelProps, 'user' | 'setUser'>;

const LoginPage = ({ onNext }: LoginPageProps) => {
  // TODO : 미들웨어 적용
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      onNext();
    }
  }, [session]);

  const onClickKakaoLogin = () => {
    signIn('kakao', {
      redirect: true,
      callbackUrl: '/login',
    });
  };
  return (
    <>
      <div className={loginPageStyles.headerWrapper}>
        <Text.TitleH1>미르었던 다짐</Text.TitleH1>
        <Text.BodyM color="grey500">다짐을 위해 친구들과 7일간 내기를 걸어요!</Text.BodyM>
      </div>
      <div className={loginPageStyles.imageWrapper}>
        <Image
          priority
          className={loginPageStyles.image}
          src="/images/dog.png"
          fill
          alt="challenge_add"
        />
      </div>
      <BottomFixedButton>
        <BottomFixedButton.First width={100} onClick={onClickKakaoLogin} color="yellow-active">
          <Text.ButtonL color="black">카카오 로그인하기</Text.ButtonL>
        </BottomFixedButton.First>
      </BottomFixedButton>
    </>
  );
};

export default LoginPage;
