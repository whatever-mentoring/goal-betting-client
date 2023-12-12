import React, { ButtonHTMLAttributes } from 'react';
import { buttonWrapperStyles } from './buttonWrapper.css';
import classNames from 'classnames';

type ButtonWrapperProps = {
  children: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const ButtonWrapper = ({ children, ...rest }: ButtonWrapperProps) => {
  return (
    <button className={classNames(buttonWrapperStyles.base, rest.className)} {...rest}>
      {children}
    </button>
  );
};

export default ButtonWrapper;
