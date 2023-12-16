import { vars } from '@/app/common/ui/colors.css';
import { flexCenterBetween, flexCenterStart } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const challengeCardStyles = {
  wrapper: style([
    flexCenterBetween,
    {
      width: '100%',
      height: `${getRem(87)}`,
      padding: `0 ${getRem(20)}`,
      transition: 'background-color ease-in-out 0.2s',
      selectors: {
        '&:active': {
          backgroundColor: vars.color.grey800,
        },
      },
    },
  ]),
  leftWrapper: style([
    flexCenterStart,
    {
      display: 'flex',
    },
  ]),
  iconWrapper: style([
    flexCenterStart,
    {
      marginRight: `${getRem(12)}`,
    },
  ]),
  left: style({
    display: 'flex',
    flexDirection: 'column',
    rowGap: `${getRem(4)}`,
  }),
  right: style({
    display: 'flex',
    alignItems: 'center',
  }),
};
