'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { headerStyles } from './header.css';
import { ButtonIcon } from '../assets/Icon';

interface HeaderProps {
  showBackButton?: boolean;
  rightButton?: ReactNode;
  backCallback?: () => void;
}

/**
 * @description
 * Header 컴포넌트는 페이지 상단에 위치하는 컴포넌트입니다.
 *
 * @param {boolean} showBackButton 뒤로가기 버튼을 보여줄지 여부를 결정합니다.
 * @param {ReactNode} rightButton 오른쪽에 위치할 버튼을 결정합니다.
 * @param {() => void} backCallback 뒤로가기 버튼을 눌렀을 때 실행할 콜백 함수입니다.
 *
 * @example
 * <Header showBackButton />
 * <Header showBackButton title="답변하기" rightButton={<ButtonIcon onClick={() => console.log('header')} />} />
 */

const Header = ({ showBackButton = false, rightButton, backCallback }: HeaderProps) => {
  const router = useRouter();
  const onClickBack = () => {
    if (backCallback) backCallback();
    router.back();
  };
  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.left}>
        {showBackButton && (
          <ButtonIcon name="arrow-left" size="m" fill="white" onClick={onClickBack}></ButtonIcon>
        )}
      </div>

      <div className={headerStyles.right}>{rightButton}</div>
    </div>
  );
};

export default Header;
