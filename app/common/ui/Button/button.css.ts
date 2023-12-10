import { RecipeVariants, recipe } from '@vanilla-extract/recipes';
import { vars } from '../colors.css';

export const buttonStyles = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '16px',
    border: 'none',
    padding: '20px 40px',
    width: '100%',
    height: '58px',
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

export type ButtonVariants = RecipeVariants<typeof buttonStyles>;
