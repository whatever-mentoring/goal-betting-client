'use client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import navigationPath from '../../navigation/navigationPath';
import Button from '../Button/Button';
import Text from '../Text/Text';
import Icon from '../assets/Icon';
import { loginDrawerStyles } from './loginDrawer.css';

const LoginDrawer = () => {
  const { data } = useSession();
  const nickname = data?.user?.nickname;
  return (
    <div className={loginDrawerStyles.container}>
      <div className={loginDrawerStyles.headerTextWrapper}>
        {!!nickname && (
          <>
            <div className={loginDrawerStyles.nicknameWrapper}>
              <Text.TitleH2 color="cyan300">{nickname}</Text.TitleH2>
              <Text.TitleH2 color="white">님</Text.TitleH2>
            </div>
            <Text.BodyS color="grey400">카카오 로그인 중</Text.BodyS>
          </>
        )}
        {!nickname && (
          <Button color="purple500-active">
            <Link
              href={navigationPath.로그인_퍼널.로그인}
              scroll={false}
              className={loginDrawerStyles.loginButton}
            >
              <Icon name="docs" size="s" fill="white" />
              <Text.BodyS color="white">로그인 하기</Text.BodyS>
            </Link>
          </Button>
        )}
      </div>

      <ul className={loginDrawerStyles.linkButtonWrapper}>
        <Link href={navigationPath.유저_설정.계정_설정} scroll={false}>
          <li className={loginDrawerStyles.linkButton}>
            <Icon name="setting" size="s" fill="white" />
            <Text.ButtonM color="white">계정 설정</Text.ButtonM>
          </li>
        </Link>
        <Link href={navigationPath.유저_설정.다짐_목록} scroll={false}>
          <li className={loginDrawerStyles.linkButton}>
            <Icon name="docs" size="s" fill="white" />
            <Text.ButtonM color="white">전체 기록 보기</Text.ButtonM>
          </li>
        </Link>
        <Link href="/login" scroll={false}>
          <li className={loginDrawerStyles.linkButton}>
            <Icon name="fist" size="s" fill="white" />
            <Text.ButtonM color="white">용용 팀 소개</Text.ButtonM>
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default LoginDrawer;
