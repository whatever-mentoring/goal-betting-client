import { style } from '@vanilla-extract/css';

export const centerBlankStyles = {
  base: style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  }),
};
