import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../colors.css';
import getRem from '../../util/getRem';

export const textAreaStyle = {
  base: style({
    appearance: 'none',
    minHeight: `${getRem(56)}`,
    width: '100%',
    backgroundColor: vars.color.grey800,
    color: vars.color.white,
    border: 'none',
    borderRadius: `${getRem(18)}`,
    boxSizing: 'border-box',
    display: 'flex',
    alignItems: 'center',
    padding: `${getRem(17)} ${getRem(20)}`,
  }),
  textAreaField: style({
    flex: 1,
    backgroundColor: 'transparent',
    border: 'none',
    color: 'inherit',
    outline: 'none',
    fontFamily: 'Pretendard-Medium',
    fontSize: `${getRem(18)}`,
    resize: 'none',
    boxSizing: 'border-box',
    ':focus': {
      outline: 'none',
      fontFamily: 'Pretendard-Medium',
    },
    '::placeholder': {
      color: vars.color.grey500,
    },
  }),
  countContainerStyle: style({
    display: 'flex',
    alignItems: 'center',
    gap: `${getRem(8)}`,
    marginLeft: `${getRem(48)}`,
  }),
  descriptionWrapper: style({
    paddingTop: `${getRem(17)}`,
    paddingLeft: `${getRem(20)}`,
  }),
};

export const textAreaWithCount = recipe({
  base: textAreaStyle.base,

  variants: {
    count: {
      true: style({
        paddingRight: `${getRem(20)}`,
      }),
    },
  },
});
