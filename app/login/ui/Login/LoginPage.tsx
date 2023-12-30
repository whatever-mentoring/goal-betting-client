import BottomFixedButton from '@/app/common/ui/Button/BottomFixedButton';
import Text from '@/app/common/ui/Text/Text';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { LoginFunnelProps } from '../../page';
import { loginPageStyles } from './login.css';

type LoginPageProps = Omit<LoginFunnelProps, 'user' | 'setUser'>;

const LoginPage = ({}: LoginPageProps) => {
  const onClickKakaoLogin = () => {
    signIn('kakao', {
      redirect: true,
      callbackUrl: '/login',
    });
  };
  return (
    <>
      <div className={loginPageStyles.headerWrapper}>
        <div className={loginPageStyles.logoImageWrapper}>
          <Image
            priority
            className={loginPageStyles.logoImage}
            src="/images/mirr/mirr_logo.png"
            fill
            alt="challenge_add"
            sizes="(max-width: 480px) 380px, (max-width: 768px) 480px, 768px"
          />
        </div>
      </div>
      <div className={loginPageStyles.imageWrapper}>
        <Image
          priority
          className={loginPageStyles.image}
          src="/images/mirr/mirr_half.png"
          fill
          alt="challenge_add"
          sizes="(max-width: 480px) 380px"
          quality={100}
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
