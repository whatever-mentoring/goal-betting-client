import { style } from '@vanilla-extract/css';
import getRem from '../util/getRem';

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

export const flexCenterBetween = style([flex, alignItemsCenter, justifyContentSpaceBetween]);
export const flexCenterCenter = style([flex, alignItemsCenter, justifyContentCenter]);
export const flexCenterStart = style([flex, alignItemsCenter, justifyContentFlexStart]);
export const flexCenterEnd = style([flex, alignItemsCenter, justifyContentFlexEnd]);

export const withPreWrapCenter = style({
  whiteSpace: 'pre-wrap',
  textAlign: 'center',
});

export const headerTextWrapper = style([
  flexCenterCenter,
  {
    marginTop: `${getRem(4)}`,
  },
]);
