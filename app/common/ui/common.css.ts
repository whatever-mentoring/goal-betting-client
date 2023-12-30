import { style } from '@vanilla-extract/css';
import getRem from '../util/getRem';
import { vars } from './colors.css';

const flex = style({
  display: 'flex',
});

const alignItemsCenter = style({
  alignItems: 'center',
});

const justifyContentCenter = style({
  justifyContent: 'center',
});

const justifyContentFlexStart = style({
  justifyContent: 'flex-start',
});

const justifyContentSpaceBetween = style({
  justifyContent: 'space-between',
});

const justifyContentFlexEnd = style({
  justifyContent: 'flex-end',
});

export const fixedButtonOverWrapper = style({
  marginBottom: `${getRem(20)}`,
});

export const underLineText = style({
  textDecoration: 'underline',
});

export const flexCenterBetween = style([flex, alignItemsCenter, justifyContentSpaceBetween]);
export const flexCenterCenter = style([flex, alignItemsCenter, justifyContentCenter]);
export const flexCenterStart = style([flex, alignItemsCenter, justifyContentFlexStart]);
export const flexCenterEnd = style([flex, alignItemsCenter, justifyContentFlexEnd]);

export const withPreWrapCenter = style({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

export const withPreWrapStart = style({
  whiteSpace: 'pre-wrap',
  textAlign: 'start',
});

export const headerTextWrapper = style([
  flexCenterCenter,
  {
    marginTop: `${getRem(4)}`,
  },
]);

export const headerColumnTextWrapper = style([
  flexCenterCenter,
  {
    flexDirection: 'column',
  },
]);

export const withFixedButtonScrollView = style({
  marginBottom: `${getRem(150)}`,
});

export const phoneMediaQuery = style({
  maxWidth: '480px',
  margin: '0 auto',

  '@media': {
    'screen and (max-width: 480px)': {
      maxWidth: '100%',
    },
  },
});

export const textButtonStyle = style([
  flexCenterCenter,
  {
    boxSizing: 'border-box',
    borderRadius: `${getRem(16)}`,
    marginBottom: `${getRem(5)}`,
    backgroundColor: vars.color.grey900,
    transition: 'opacity 0.3s ease-in-out',
    selectors: {
      '&:active': {
        opacity: 0.7,
      },
    },
  },
]);
