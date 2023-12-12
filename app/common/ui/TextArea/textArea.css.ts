import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';
import { flexCenterCenter } from '../common.css';

export const textAreaStyle = {
  textAreaWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
      width: '100%',
    },
  ]),
  base: style([
    flexCenterCenter,
    {
      minHeight: `${getRem(56)}`,
      width: '100%',
      backgroundColor: vars.color.grey800,
      color: vars.color.white,
      borderRadius: `${getRem(18)}`,
      boxSizing: 'border-box',
      padding: `${getRem(17)} ${getRem(20)}`,
    },
  ]),
  textAreaField: style({
    flex: 1,
    color: 'inherit',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    fontFamily: 'Pretendard-Medium',
    fontSize: `${getRem(18)}`,
    ':focus': {
      outline: 'none',
      fontFamily: 'Pretendard-Medium',
    },
    '::placeholder': {
      color: vars.color.grey500,
    },
  }),

  countContainerStyle: style([
    {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      paddingTop: `${getRem(17)}`,
      paddingRight: `${getRem(20)}`,
    },
  ]),
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
