import { style } from '@vanilla-extract/css';
import { flexCenterCenter } from '../common.css';

export const buttonWrapperStyles = {
  base: style([
    flexCenterCenter,
    {
      cursor: 'pointer',
      boxSizing: 'border-box',
      selectors: {
        '&:active': {
          backgroundColor: 'transparent',
        },
        '&:hover': {
          backgroundColor: 'transparent',
        },
        '&:focus': {
          backgroundColor: 'transparent',
        },
        '&:disabled': {
          backgroundColor: 'transparent',
        },
      },
    },
  ]),
};
