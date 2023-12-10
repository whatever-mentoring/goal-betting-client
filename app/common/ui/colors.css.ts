import { createGlobalTheme } from '@vanilla-extract/css';

export type Color = keyof (typeof vars)['color'];

export const vars = createGlobalTheme(':root', {
  color: {
    // default
    white: '#FFFFFF',
    black: '#000000',
    // purple
    purple050: '#F6F5FE',
    purple100: '#E9E5FE',
    purple200: '#C8C3FA',
    purple300: '#A29CF9',
    purple400: '#847DF9',
    purple500: '#6355F1',
    purple600: '#493ECA',
    purple700: '#3A34A4',
    purple800: '#2A2778',
    purple900: '#242368',
    // grey
    grey050: '#F7F6FB',
    grey100: '#F1F0F5',
    grey200: '#E9E8F0',
    grey300: '#E2E1E9',
    grey400: '#CECEDA',
    grey500: '#85889A',
    grey600: '#858899',
    grey700: '#515463',
    grey800: '#262D38',
    grey900: '#202732',
    grey950: '#010000',
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
  },
});
