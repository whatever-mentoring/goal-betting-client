import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';
import { flexCenterStart } from '../common.css';

export const loginDrawerStyles = {
  container: style({
    padding: `0 ${getRem(31)}`,
  }),

  headerTextWrapper: style([
    {
      display: 'flex',
      flexDirection: 'column',
      marginTop: `${getRem(8)}`,
      rowGap: `${getRem(8)}`,
    },
  ]),

  nicknameWrapper: style([flexCenterStart]),

  loginButton: style({
    display: 'flex',
    columnGap: `${getRem(8)}`,
    alignItems: 'center',
    selectors: {
      '&:hover': {
        cursor: 'pointer',
        opacity: 0.5,
      },
      '&:active': {
        cursor: 'pointer',
        opacity: 0.5,
      },
    },
  }),

  linkButtonWrapper: style([
    {
      display: 'flex',
      flexDirection: 'column',
      marginTop: `${getRem(45)}`,
      rowGap: `${getRem(8)}`,
      boxSizing: 'border-box',
    },
  ]),

  linkButton: style([
    flexCenterStart,
    {
      columnGap: `${getRem(8)}`,
      padding: `${getRem(6)} ${getRem(0)}`,
      boxSizing: 'border-box',
      borderRadius: `${getRem(5)}`,
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',

      selectors: {
        '&:hover': {
          padding: `${getRem(6)} ${getRem(16)}`,
          backgroundColor: vars.color.grey800,
          color: vars.color.white,
        },
        '&:active': {
          padding: `${getRem(6)} ${getRem(16)}`,
          backgroundColor: vars.color.grey800,
          color: vars.color.white,
        },
      },
    },
  ]),
};
