import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../colors.css';

export const textStyles = {
  pretendard: {
    bold: style({
      fontFamily: 'Pretendard-Bold',
    }),
    semiBold: style({
      fontFamily: 'Pretendard-SemiBold',
    }),
    medium: style({
      fontFamily: 'Pretendard-Medium',
    }),
  },
  textSize: {
    titleH1: style({
      fontSize: '26px',
      fontWeight: 'bold',
    }),
    titleH2: style({
      fontSize: '20px',
      fontWeight: 'bold',
    }),
    buttonL: style({
      fontSize: '18px',
      fontWeight: 'semibold',
    }),
    buttonM: style({
      fontSize: '12px',
      fontWeight: 'semibold',
    }),
    bodyL: style({
      fontSize: '18px',
      fontWeight: 'medium',
    }),
    bodyM: style({
      fontSize: '16px',
      fontWeight: 'medium',
    }),
    bodyS: style({
      fontSize: '14px',
      fontWeight: 'medium',
    }),
  },
};

export const textColors = styleVariants(vars.color, (colorValue) => ({
  color: colorValue,
}));
