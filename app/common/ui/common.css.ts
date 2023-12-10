import { style } from '@vanilla-extract/css';

const flex = style({
  display: 'flex',
});

const alignItemsCenter = style({
  alignItems: 'center',
});

const justifyContentCenter = style({
  justifyContent: 'center',
});

const justifyContentSpaceBetween = style({
  justifyContent: 'space-between',
});

const justifyContentFlexEnd = style({
  justifyContent: 'flex-end',
});

export const flexCenterBetween = style([flex, alignItemsCenter, justifyContentSpaceBetween]);
export const flexCenterCenter = style([flex, alignItemsCenter, justifyContentCenter]);
export const flexCenterEnd = style([flex, alignItemsCenter, justifyContentFlexEnd]);
