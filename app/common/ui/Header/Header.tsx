'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { ButtonIcon } from '../assets/Icon';
import { headerStyles } from './header.css';

interface HeaderProps {
  showBackButton?: boolean;
  backTo?: string;
  appendingRightButton?: ReactNode;
  backCallback?: () => void;
}

/**
 * @description
 * Header 컴포넌트는 페이지 상단에 위치하는 컴포넌트입니다.
 *
 * @param {boolean} showBackButton 뒤로가기 버튼을 보여줄지 여부를 결정합니다.
 * @param {string} backTo 뒤로가기 버튼을 눌렀을 때 이동할 경로를 결정합니다.
 * @param {ReactNode} appendingRightButton 오른쪽에 위치할 버튼을 결정합니다.
 * @param {() => void} backCallback 뒤로가기 버튼을 눌렀을 때 실행할 콜백 함수입니다.
 *
 * @example
 * <Header showBackButton />
 * <Header showBackButton title="답변하기" appendingRightButton={<ButtonIcon onClick={() => console.log('header')} />} />
 */

const Header = ({
  showBackButton = false,
  backTo,
  appendingRightButton,
  backCallback,
}: HeaderProps) => {
  const router = useRouter();
  const onClickBack = () => {
    if (backCallback) backCallback();
    if (backTo) {
      router.push(backTo);
      return;
    }
    router.back();
  };
  return (
    <div className={headerStyles.container}>
      <div className={headerStyles.left}>
        {showBackButton && (
          <ButtonIcon name="arrow-left" size="m" fill="white" onClick={onClickBack}></ButtonIcon>
        )}
      </div>

      <div className={headerStyles.right}>{appendingRightButton}</div>
    </div>
  );
};

export default Header;
