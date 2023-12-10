import React, {
  ChangeEvent,
  ComponentPropsWithRef,
  forwardRef,
  useState,
  useRef,
  useLayoutEffect,
  useImperativeHandle,
} from 'react';
import { textAreaWithCount, textAreaStyle } from './textArea.css';
import Text from '../Text/Text';
import { ButtonIcon } from '../assets/Icon';
import { calculateRem } from '../../util/getRem';

const FONT_SIZE = calculateRem(18);

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
  };
  maxLine?: number;
} & ComponentPropsWithRef<'textarea'>;

const Base = forwardRef<HTMLTextAreaElement, BaseProps>(
  ({ value, onChange, withCount, maxLine = 3, ...rest }, ref) => {
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    // 외부의 ref를 사용할 수 있도록 함
    useImperativeHandle(ref, () => textAreaRef.current as HTMLTextAreaElement);

    // textarea의 높이를 자동으로 조절
    useLayoutEffect(() => {
      if (textAreaRef.current) {
        if (textAreaRef.current.scrollHeight > FONT_SIZE * maxLine) {
          textAreaRef.current.style.height = `${FONT_SIZE * maxLine}px`;
          textAreaRef.current.style.overflowY = 'auto';
          return;
        }
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }, [value]);

    // withCount가 있을 경우 글자 수를 세어줌
    const [count, setCount] = useState(value.length ?? 0);

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
      if (withCount && e.target.value.length > withCount.max) return;
      setCount(e.target.value.length);
      onChange(e);
    };

    const onClickClose = () => {
      setCount(0);
      onChange({ target: { value: '' } } as ChangeEvent<HTMLTextAreaElement>);
    };

    const withCountVisible = withCount && count > 0;

    return (
      <div className={textAreaWithCount({ count: Boolean(withCount) })}>
        <textarea
          value={value}
          onChange={handleChange}
          ref={textAreaRef}
          className={textAreaStyle.textAreaField}
          itemType="text"
          rows={1}
          {...rest}
        />
        {!!withCountVisible && (
          <div className={textAreaStyle.countContainerStyle}>
            <ButtonIcon onClick={onClickClose} name="close" size="m" fill="grey600" />
            <Text.BodyM color="grey600">
              {count}/{withCount.max}
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
