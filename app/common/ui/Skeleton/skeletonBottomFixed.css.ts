import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { flexCenterBetween, flexCenterCenter, phoneMediaQuery } from '../common.css';

export const skeletonBottomFixedStyle = {
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
  button: style([
    flexCenterCenter,
    {
      width: '100%',
      height: `${getRem(58)}`,
      borderRadius: `${getRem(16)}`,
      padding: `${getRem(18.5)} 0`,
      border: 'none',
    },
  ]),
};
