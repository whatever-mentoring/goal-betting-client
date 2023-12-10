import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from 'react';
import { ButtonVariants, buttonStyles } from './button.css';

type ExtractedColorType = Extract<ButtonVariants, { color?: any }>;
type ButtonColorType = ExtractedColorType['color'];

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
