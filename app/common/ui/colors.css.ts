import { createGlobalTheme } from '@vanilla-extract/css';

export type Color = keyof (typeof vars)['color'];

export const vars = createGlobalTheme(':root', {
  color: {
    // default
    white: '#FFFFFF',
    black: '#000000',
    // purple
    purple050: '#F6F5FE',
    purple100: '#E8E6FE',
    purple200: '#C9C4FB',
    purple300: '#A49DFB',
    purple400: '#877FFB',
    purple500: '#6758F4',
    purple600: '#4D41CC',
    purple700: '#3E36A6',
    purple800: '#2D2879',
    purple900: '#262469',
    // grey
    grey050: '#F7F6FB',
    grey100: '#F1F0F5',
    grey200: '#E2E1E8',
    grey300: '#CECED7',
    grey400: '#A9ABB8',
    grey500: '#868898',
    grey600: '#525462',
    grey700: '#3E404D',
    grey800: '#292D35',
    grey900: '#23272F',
    // cyan
    cyan050: '#F0FBFD',
    cyan100: '#D3F1F6',
    cyan200: '#9DE3EC',
    cyan300: '#6EDAE6',
    cyan400: '#2FCCE0',
    cyan500: '#00B9D1',
    cyan600: '#00AABD',
    cyan700: '#0095A8',
    cyan800: '#007E8A',
    cyan900: '#05707A',
    // background
    background: '#22272F',
  },
});
