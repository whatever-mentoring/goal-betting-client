import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';

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
    // gap: '4px',
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
    // gap: '4px',
    justifyContent: 'center',
    alignItems: 'center',
  }),

  dayWrapper: style({
    display: 'grid',
    position: 'relative',
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
  }),

  fixedFirstCircle: style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `${vars.color.purple200}`,
    zIndex: 1,
  }),

  fixedLastCircle: style({
    position: 'absolute',
    top: '50%',
    left: '50%',
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: `${vars.color.purple200}`,
    zIndex: 1,
  }),

  firstDay: style({
    background: `linear-gradient(to left, #41435C 0%, #41435C 50%, transparent 50%) no-repeat !important`,
    backgroundSize: 'calc(100%) calc(100%) !important',
    backgroundPosition: 'right bottom !important',
  }),

  lastDay: style({
    background: `linear-gradient(to right, #41435C 0%, #41435C 50%, transparent 50%) no-repeat !important`,
    backgroundSize: 'calc(100%) calc(100%) !important',
    backgroundPosition: 'right bottom !important',
  }),

  currentDay: style({
    color: `${vars.color.white}`,
    backgroundColor: `#41435C`,
  }),

  emptyCell: style({
    visibility: 'hidden',
  }),

  otherMonthDay: style({
    color: vars.color.grey700,
  }),

  blackColorDay: style({
    color: `${vars.color.black} !important`,
    zIndex: 2,
  }),

  dayText: style({
    fontSize: '14px',
    color: vars.color.white,
    zIndex: 2,
  }),
};
