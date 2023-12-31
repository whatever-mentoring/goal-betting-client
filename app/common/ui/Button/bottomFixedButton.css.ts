import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import getRem from '../../util/getRem';
import { flexCenterBetween, phoneMediaQuery } from '../common.css';

export const bottomFixedButtonStyle = {
  base: style([
    flexCenterBetween,
    phoneMediaQuery,
    {
      position: 'fixed',
      flexDirection: 'column',
      columnGap: `${getRem(20)}`,
      boxSizing: 'border-box',
      width: '100%',
      padding: `0 ${getRem(20)}`,
      bottom: getRem(23),
    },
  ]),
  overItem: style({
    position: 'relative',
    boxSizing: 'content-box',
  }),
};

export const bottomFixedButtonWrapperStyle = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    width: {
      10: {
        width: '10%',
      },
      20: {
        width: '20%',
      },
      30: {
        width: '30%',
      },
      40: {
        width: '40%',
      },
      50: {
        width: '50%',
      },
      60: {
        width: '60%',
      },
      70: {
        width: '70%',
      },
      80: {
        width: '80%',
      },
      90: {
        width: '90%',
      },
      100: {
        width: '100%',
      },
    },
  },
  defaultVariants: {
    width: 100,
  },
});

type BottomFixedButtonWrapperVariants = RecipeVariants<typeof bottomFixedButtonWrapperStyle>;
type ExtractedWidthType = Extract<BottomFixedButtonWrapperVariants, { width?: any }>;
export type BottomFixedButtonWrapperWidthType = ExtractedWidthType['width'];
