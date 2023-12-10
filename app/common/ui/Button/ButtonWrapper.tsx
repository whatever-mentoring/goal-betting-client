import React, { ButtonHTMLAttributes } from 'react';
import { buttonWrapperStyles } from './buttonWrapper.css';

type ButtonWrapperProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonWrapper = ({ children, ...rest }: ButtonWrapperProps) => {
  return (
    <button className={buttonWrapperStyles.base} {...rest}>
      {children}
    </button>
  );
};

export default ButtonWrapper;
