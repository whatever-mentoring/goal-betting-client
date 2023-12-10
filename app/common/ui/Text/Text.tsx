import { textColors, textStyles } from './text.css';
import { Color } from '../colors.css';
import classNames from 'classnames';
import { ReactNode } from 'react';

type TextComponentProps = {
  children: ReactNode;
  className?: string;
  color?: Color;
};

const Text = ({ children, className, color = 'white' }: TextComponentProps) => {
  const colorClass = color ? textColors[color] : '';
  return <span className={classNames(colorClass, className)}>{children}</span>;
};

// Title
Text.TitleH1 = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.bold, textStyles.textSize.titleH1)}
    color={color}
  >
    {children}
  </Text>
);
Text.TitleH2 = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.bold, textStyles.textSize.titleH2)}
    color={color}
  >
    {children}
  </Text>
);

// Button
Text.ButtonL = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.semiBold, textStyles.textSize.buttonL)}
    color={color}
  >
    {children}
  </Text>
);
Text.ButtonM = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.semiBold, textStyles.textSize.buttonM)}
    color={color}
  >
    {children}
  </Text>
);

// Body
Text.BodyL = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyL)}
    color={color}
  >
    {children}
  </Text>
);
Text.BodyM = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyM)}
    color={color}
  >
    {children}
  </Text>
);
Text.BodyS = ({ children, color }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyS)}
    color={color}
  >
    {children}
  </Text>
);

export default Text;
