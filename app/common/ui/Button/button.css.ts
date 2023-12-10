import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { vars } from '../colors.css';
import getRem from '../../util/getRem';

export const buttonStyles = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: `${getRem(16)}`,
    border: 'none',
    padding: `${getRem(18.5)} 0`,
    width: '100%',
    height: `${getRem(58)}`,
    WebkitFontSmoothing: 'antialiased',
    transition: 'color 0.3s ease-in-out, background-color 0.3s ease-in-out',
    cursor: 'pointer',
  },

  variants: {
    color: {
      purple500: {
        background: vars.color.purple500,
        selectors: { '&:hover': { background: vars.color.purple600 } },
      },
      purple600: {
        background: vars.color.purple600,
        selectors: { '&:hover': { background: vars.color.purple700 } },
      },
      grey600: {
        background: vars.color.grey600,
        selectors: { '&:hover': { background: vars.color.grey700 } },
      },
      grey700: {
        background: vars.color.grey700,
        selectors: { '&:hover': { background: vars.color.grey800 } },
      },
      yellow: { background: '#F5E14C', selectors: { '&:hover': { background: '#F5E14C' } } },
    },
  },

  defaultVariants: {
    color: 'purple500',
  },
});

type ButtonVariants = RecipeVariants<typeof buttonStyles>;
type ExtractedColorType = Extract<ButtonVariants, { color?: any }>;
export type ButtonColorType = ExtractedColorType['color'];
