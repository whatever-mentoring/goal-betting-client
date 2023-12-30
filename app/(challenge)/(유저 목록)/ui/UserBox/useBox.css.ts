import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const userBoxStyles = {
  base: style({
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: vars.color.grey800,
    padding: `${getRem(16)}`,
    height: `${getRem(89)}`,
    borderRadius: `${getRem(16)}`,
  }),

  witheBorder: style({
    border: `1px solid ${vars.color.grey600}`,
  }),

  leftWrapper: style([
    flexCenterCenter,
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  ]),

  userWrapper: style([
    flexCenterCenter,
    {
      width: `${getRem(41)}`,
      height: `${getRem(41)}`,
      borderRadius: '50%',
      backgroundColor: vars.color.white,
    },
  ]),

  userImage: style({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }),

  middleWrapper: style([
    {
      display: 'flex',
      flexGrow: 1,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '0 20px',
      height: '100%',
    },
  ]),

  rightWrapper: style([
    {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  ]),
};
