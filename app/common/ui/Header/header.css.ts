import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';

export const headerStyles = {
  container: style({
    position: 'sticky',
    top: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    boxSizing: 'border-box',
    padding: `0 ${getRem(19)}`,
    height: getRem(52),
    backgroundColor: 'transparent',
  }),
  left: style({
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  }),

  right: style({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1,
  }),
};
