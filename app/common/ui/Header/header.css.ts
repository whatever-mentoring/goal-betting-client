import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';
import { flexCenterBetween, flexCenterEnd, flexCenterStart } from '../common.css';

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
      backgroundColor: vars.color.background,
      zIndex: 9999,
    },
  ]),

  left: style([
    flexCenterStart,
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
