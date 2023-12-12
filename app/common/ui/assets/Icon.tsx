// TODO : 아이콘 사이즈 논의 필요

import { ButtonHTMLAttributes } from 'react';
import ButtonWrapper from '../Button/ButtonWrapper';
import { Color, vars } from '../colors.css';

const sizeMap = {
  l: 28,
  m: 24,
  s: 20,
} as const;

export interface IconProps {
  name: IconName;
  /** l: 28, m:24, s:20 */
  size: keyof typeof sizeMap;
  fill?: Color;
}

/**
 *
 * @example
 * <Icon name="check" size="s" />
 */

const Icon = ({ name, size, fill = 'white' }: IconProps) => (
  <svg
    width={sizeMap[size]}
    height={sizeMap[size]}
    fill={vars.color[fill]}
    style={{ pointerEvents: 'none' }}
  >
    <use href={`#${name}`} />
  </svg>
);

type ButtonIconProps = IconProps & ButtonHTMLAttributes<HTMLButtonElement>;

export const ButtonIcon = ({ name, size, fill = 'white', ...rest }: ButtonIconProps) => (
  <ButtonWrapper {...rest}>
    <svg
      width={sizeMap[size]}
      height={sizeMap[size]}
      fill={vars.color[fill]}
      style={{ pointerEvents: 'none' }}
    >
      <use href={`#${name}`} />
    </svg>
  </ButtonWrapper>
);

export default Icon;

export type IconName =
  | 'arrow-left'
  | 'arrow-down'
  | 'arrow-right'
  | 'close'
  | 'close-circle'
  | 'calendar'
  | 'menu'
  | 'arrow-down'
  | 'setting'
  | 'docs'
  | 'fist'
  | 'share'
  | 'download'
  | 'more'
  | 'camera';
