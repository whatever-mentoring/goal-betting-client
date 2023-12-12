import { style } from '@vanilla-extract/css';
import { vars } from '../colors.css';
import getRem from '../../util/getRem';

export const calendarStyle = {
  base: style({
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    backgroundColor: '#292D35',
    color: vars.color.white,
    fontFamily: 'Pretendard-Medium',
    fontWeight: 'normal',
    padding: `${getRem(10)} ${getRem(20)} ${getRem(20)}`,
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: `${getRem(16)}`,
  }),

  header: style({
    display: 'flex',
    alignItems: 'center',
    marginBottom: '10px',
    justifyContent: 'center',
    columnGap: '10px',
  }),

  headerButton: style({
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: 'none',
    color: vars.color.white,
    cursor: 'pointer',
  }),

  weekHeader: style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(20px, 1fr))',
    gap: '4px',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  weekDay: style({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '20px',
    borderRadius: '50%',
    margin: '8px',
  }),

  week: style({
    display: 'grid',
    gridTemplateColumns: 'repeat(7, minmax(20px, 1fr))',
    gap: '4px',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  dayWrapper: style({
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '35px',
    cursor: 'pointer',
  }),

  day: style({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
  }),

  currentDay: style({
    backgroundColor: vars.color.purple200,
    color: vars.color.black,
  }),

  emptyCell: style({
    visibility: 'hidden',
  }),

  otherMonthDay: style({
    color: vars.color.grey700,
  }),
};
