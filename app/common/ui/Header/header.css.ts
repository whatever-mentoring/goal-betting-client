import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { flexCenterBetween, flexCenterCenter, flexCenterEnd } from '../common.css';

export const headerStyles = {
  container: style([
    flexCenterBetween,
    {
      position: 'sticky',
      top: 0,
      width: '100%',
      boxSizing: 'border-box',
      padding: `0 ${getRem(19)}`,
      height: getRem(52),
      backgroundColor: 'transparent',
    },
  ]),

  left: style([
    flexCenterCenter,
    {
      flex: 1,
    },
  ]),

  right: style([
    flexCenterEnd,
    {
      flex: 1,
    },
  ]),
};
