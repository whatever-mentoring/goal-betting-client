import { keyframes, style } from '@vanilla-extract/css';
import { vars } from '../colors.css';

const floating1 = keyframes({
  '0%': { opacity: 1 },
  '50%': { opacity: 0.4 },
  '100%': { opacity: 1 },
});

const floating2 = keyframes({
  '0%': { opacity: 0.4 },
  '50%': { opacity: 1 },
  '100%': { opacity: 0.4 },
});

export const skeletonAnimationStyles = {
  skeletonAnimation: style({
    animation: `${floating1} 2s ease infinite`,
    backgroundColor: vars.color.grey600,
  }),
  skeletonAnimationReverse: style({
    animation: `${floating2} 2s ease infinite`,
    backgroundColor: vars.color.grey600,
  }),
};
