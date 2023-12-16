import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';
import { flexCenterCenter } from '../common.css';

export const buttonStyles = recipe({
  base: [
    flexCenterCenter,
    {
      width: '100%',
      height: `${getRem(58)}`,
      borderRadius: `${getRem(16)}`,
      padding: `${getRem(18.5)} 0`,
      border: 'none',
      WebkitFontSmoothing: 'antialiased',
      transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
      cursor: 'pointer',
    },
  ],
  variants: {
    color: {
      'purple500-active': {
        background: vars.color.purple500,
        selectors: {
          '&:active': { background: vars.color.purple600 },
          '&:disabled': { background: vars.color.purple500 },
        },
      },
      'purple600-active': {
        background: vars.color.purple600,
        selectors: { '&:active': { background: vars.color.purple700 } },
      },
      'grey600-active': {
        background: vars.color.grey600,
        selectors: { '&:active': { background: vars.color.grey700 } },
      },
      'grey800-active': {
        background: vars.color.grey800,
        selectors: { '&:active': { background: vars.color.grey900 } },
      },
      'yellow-active': {
        background: '#F5E14C',
        selectors: { '&:active': { background: '#D9BF00' } },
      },

      purple500: {
        background: vars.color.purple500,
      },
      purple600: {
        background: vars.color.purple600,
      },
      grey600: {
        background: vars.color.grey600,
      },
      grey700: {
        background: vars.color.grey700,
      },
      yellow: { background: '#F5E14C' },
    },
  },
  defaultVariants: {
    color: 'purple500',
  },
});

type ButtonVariants = RecipeVariants<typeof buttonStyles>;
type ExtractedColorType = Extract<ButtonVariants, { color?: any }>;
export type ButtonColorType = ExtractedColorType['color'];
