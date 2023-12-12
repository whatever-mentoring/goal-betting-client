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
interface HeaderTextProps extends TextComponentProps {
  level: 'h1' | 'h2';
}

const HeaderText = ({ children, className, level, color = 'white' }: HeaderTextProps) => {
  const colorClass = color ? textColors[color] : '';
  if (level === 'h1') {
    return (
      <h1
        className={classNames(
          textStyles.pretendard.bold,
          textStyles.textSize.titleH1,
          colorClass,
          className,
        )}
      >
        {children}
      </h1>
    );
  }
  if (level === 'h2') {
    return (
      <h2
        className={classNames(
          textStyles.pretendard.bold,
          textStyles.textSize.titleH2,
          colorClass,
          className,
        )}
      >
        {children}
      </h2>
    );
  }
};

Text.TitleH1 = ({ children, color, className }: TextComponentProps) => (
  <HeaderText
    className={classNames(textStyles.pretendard.bold, textStyles.textSize.titleH1, className)}
    color={color}
    level="h1"
  >
    {children}
  </HeaderText>
);
Text.TitleH2 = ({ children, color, className }: TextComponentProps) => (
  <HeaderText
    className={classNames(textStyles.pretendard.bold, textStyles.textSize.titleH2, className)}
    color={color}
    level="h2"
  >
    {children}
  </HeaderText>
);

// Button
interface ButtonTextProps extends TextComponentProps {
  level: 'buttonL' | 'buttonM';
}

const ButtonText = ({ children, className, level, color = 'white' }: ButtonTextProps) => {
  const colorClass = color ? textColors[color] : '';
  if (level === 'buttonL') {
    return (
      <span
        className={classNames(
          textStyles.pretendard.semiBold,
          textStyles.textSize.buttonL,
          colorClass,
          className,
        )}
      >
        {children}
      </span>
    );
  }
  if (level === 'buttonM') {
    return (
      <span
        className={classNames(
          textStyles.pretendard.semiBold,
          textStyles.textSize.buttonM,
          colorClass,
          className,
        )}
      >
        {children}
      </span>
    );
  }
};

Text.ButtonL = ({ children, color, className }: TextComponentProps) => (
  <ButtonText
    className={classNames(textStyles.pretendard.semiBold, textStyles.textSize.buttonL, className)}
    color={color}
    level="buttonL"
  >
    {children}
  </ButtonText>
);
Text.ButtonM = ({ children, color, className }: TextComponentProps) => (
  <ButtonText
    className={classNames(textStyles.pretendard.semiBold, textStyles.textSize.buttonM, className)}
    color={color}
    level="buttonM"
  >
    {children}
  </ButtonText>
);

// Body
Text.BodyL = ({ children, color, className }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyL, className)}
    color={color}
  >
    {children}
  </Text>
);
Text.BodyM = ({ children, color, className }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyM, className)}
    color={color}
  >
    {children}
  </Text>
);
Text.BodyS = ({ children, color, className }: TextComponentProps) => (
  <Text
    className={classNames(textStyles.pretendard.medium, textStyles.textSize.bodyS, className)}
    color={color}
  >
    {children}
  </Text>
);

export default Text;
