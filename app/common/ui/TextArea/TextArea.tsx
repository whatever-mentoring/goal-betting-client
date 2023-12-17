import classNames from 'classnames';
import React, { ChangeEvent, forwardRef, useState } from 'react';
import TextAreaAutoSize, { TextareaAutosizeProps } from 'react-textarea-autosize';
import Text from '../Text/Text';
import { ButtonIcon } from '../assets/Icon';
import { textAreaStyle, textAreaWithCount } from './textArea.css';

interface TextAreaProps {
  children?: React.ReactNode;
}

/**
 *
 * @description
 * TextArea 컴포넌트는 입력창을 묶어주는 컴포넌트입니다.
 * 입력창의 글자 수를 세어주는 기능을 제공합니다.
 *
 * @example
 * <TextArea>
 *  <TextArea.Base
 *   value={input}
 *   onChange={onChange}
 *   placeholder="입력해주세요"
 *   withCount={{ max: 100 }}
 *   ref={textAreaRef}
 *  />
 *  <TextArea.Description text="최대 100자까지 입력 가능합니다." />
 * </TextArea>
 *
 */

const TextArea = ({ children }: TextAreaProps) => {
  return <>{children}</>;
};

export type BaseProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  withCount?: {
    max: number;
    initialVisible?: boolean;
  };
} & TextareaAutosizeProps;

const Base = forwardRef<HTMLTextAreaElement, BaseProps>(
  ({ value, onChange, withCount, className, ...rest }, ref) => {
    const [count, setCount] = useState(value.length ?? 0);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (rest.maxRows && rest.maxRows === 1 && e.target.value.includes('\n')) return;
      if (withCount && e.target.value.length > withCount.max) return;

      setCount(e.target.value.length);
      onChange(e);
    };

    const onClickClose = () => {
      setCount(0);
      onChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
    };

    const getCountVisible = () => {
      if (!withCount) return false;
      if (count > 0) return true;
      return withCount.initialVisible ?? false;
    };

    return (
      <div className={classNames(textAreaStyle.textAreaWrapper, className)}>
        <div className={textAreaWithCount({ count: Boolean(withCount) })}>
          <TextAreaAutoSize
            value={value}
            onChange={handleChange}
            ref={ref}
            className={textAreaStyle.textAreaField}
            itemType="text"
            required
            {...rest}
          />
          {!!count && !rest.disabled && (
            <ButtonIcon onClick={onClickClose} name="close-circle" size="m" fill="grey600" />
          )}
        </div>
        {getCountVisible() && (
          <div className={textAreaStyle.countContainerStyle}>
            <Text.BodyM color="grey600">
              {count}/{withCount?.max}
            </Text.BodyM>
          </div>
        )}
      </div>
    );
  },
);

interface DescriptionProps {
  text: string;
}

const Description = ({ text }: DescriptionProps) => {
  return (
    <div className={textAreaStyle.descriptionWrapper}>
      <Text.BodyM color="grey600">{text}</Text.BodyM>
    </div>
  );
};

TextArea.Base = Base;
TextArea.Description = Description;

export default TextArea;
