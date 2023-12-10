import React from 'react';
import Button, { ButtonProps } from './Button';
import {
  BottomFixedButtonWrapperWidthType,
  bottomFixedButtonStyle,
  bottomFixedButtonWrapperStyle,
} from './bottomFixedButton.css';

interface BottomFixedButtonProps {
  children: React.ReactNode;
}

/**
 * @description
 * BottomFixedButton 컴포넌트는 페이지 하단에 위치하는 버튼을 묶어주는 컴포넌트입니다.
 * 하단에 위치하는 버튼은 최대 2개까지만 가능합니다.
 * 버튼의 너비는 props로 전달할 수 있습니다.
 *
 * @example
 * <BottomFixedButton>
 *   <BottomFixedButton.First width={50} onClick={() => {}}>취소</BottomFixedButton.First>
 *   <BottomFixedButton.Second width={50} onClick={() => {}}>확인</BottomFixedButton.Second>
 * </BottomFixedButton>
 */

const BottomFixedButton = ({ children }: BottomFixedButtonProps) => {
  return <div className={bottomFixedButtonStyle}>{children}</div>;
};

type FirstButtonProps = {
  children: React.ReactNode;
  width?: BottomFixedButtonWrapperWidthType;
} & ButtonProps;

const FirstButton = ({ children, width = 100, ...rest }: FirstButtonProps) => {
  return (
    <div className={bottomFixedButtonWrapperStyle({ width })}>
      <Button {...rest}>{children}</Button>
    </div>
  );
};

type SecondButtonProps = {
  children: React.ReactNode;
  width: BottomFixedButtonWrapperWidthType;
} & ButtonProps;

const SecondButton = ({ width = 100, children, ...rest }: SecondButtonProps) => {
  return (
    <div className={bottomFixedButtonWrapperStyle({ width })}>
      <Button {...rest}>{children}</Button>
    </div>
  );
};

BottomFixedButton.First = FirstButton;
BottomFixedButton.Second = SecondButton;

export default BottomFixedButton;
