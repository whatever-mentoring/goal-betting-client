import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const startDatePageStyles = {
  calendarInputWrapper: style([
    flexCenterCenter,
    {
      marginTop: `${getRem(33)}`,
      padding: `0 ${getRem(35)}`,
      position: 'relative',
    },
  ]),

  calendarInput: style({
    width: '100%',
    border: `2px solid ${vars.color.purple500}`,
    boxSizing: 'border-box',
    padding: `${getRem(17.5)} ${getRem(20)}`,
    borderRadius: `${getRem(16)}`,
  }),

  hiddenInput: style({
    display: 'none',
  }),

  calendarIcon: style({
    position: 'absolute',
    right: getRem(55),
  }),

  calendarWrapper: style([
    flexCenterCenter,
    {
      padding: `${getRem(12)} ${getRem(35)} ${getRem(18)} ${getRem(35)} `,
      width: '100%',
    },
  ]),

  underLineText: style({
    textDecoration: 'underline',
  }),

  descriptionWrapper: style([flexCenterCenter]),
};
