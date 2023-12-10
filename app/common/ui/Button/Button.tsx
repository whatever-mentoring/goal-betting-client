import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonColorType, buttonStyles } from './button.css';

export type ButtonProps = {
  children: ReactNode;
  color?: ButtonColorType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, type = 'button', color = 'purple500', ...rest }, ref) => {
    return (
      <button type={type} ref={ref} className={buttonStyles({ color })} {...rest}>
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
