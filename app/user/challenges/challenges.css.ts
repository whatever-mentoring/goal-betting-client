import { vars } from '@/app/common/ui/colors.css';
import { flexCenterStart } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';
import { RecipeVariants, recipe } from '@vanilla-extract/recipes';

export const selectButton = recipe({
  base: {
    padding: `${getRem(10)}`,
    backgroundColor: vars.color.purple600,
    color: vars.color.white,
    transition: 'all 0.3s ease',
    marginRight: `${getRem(14)}`,
    border: `1px solid ${vars.color.white}`,
    borderRadius: `${getRem(20)}`,
    cursor: 'pointer',
    fontFamily: 'Pretendard-Bold',
    fontSize: `${getRem(14)}`,
  },
  variants: {
    mode: {
      active: {
        backgroundColor: vars.color.purple600,
        color: vars.color.white,
        selectors: {
          '&:hover': {
            backgroundColor: vars.color.purple700,
          },
          '&:active': {
            backgroundColor: vars.color.purple800,
          },
        },
      },
      inactive: {
        backgroundColor: vars.color.grey800,
        color: vars.color.grey500,
        selectors: {
          '&:hover': {
            backgroundColor: vars.color.grey900,
            color: vars.color.white,
          },
          '&:active': {
            backgroundColor: vars.color.grey900,
            color: vars.color.white,
          },
        },
      },
    },
  },
});

export type ButtonVariants = RecipeVariants<typeof selectButton>;

export const challengesPageStyles = {
  topButtonWrapper: style([
    flexCenterStart,
    {
      marginTop: `${getRem(20)}`,
      marginBottom: `${getRem(20)}`,
      columnGap: `${getRem(10)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),
  selectButton: style({
    position: 'absolute',
    opacity: 0,
    width: 0,
    height: 0,
    margin: 0,
    padding: 0,
    zIndex: -1,
  }),
  indicator: style({
    minHeight: `100dvh`,
  }),
  stepWrapper: style([
    {
      flexDirection: 'column',
      marginTop: `${getRem(40)}`,
      marginBottom: `${getRem(20)}`,
      columnGap: `${getRem(10)}`,
    },
  ]),
  stepHeaderWrapper: style([
    flexCenterStart,
    {
      marginBottom: `${getRem(20)}`,
      columnGap: `${getRem(10)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),
  stepItemWrapper: style([
    flexCenterStart,
    {
      flexDirection: 'column',
      width: '100%',
      marginBottom: `${getRem(20)}`,
      columnGap: `${getRem(10)}`,
    },
  ]),
};
