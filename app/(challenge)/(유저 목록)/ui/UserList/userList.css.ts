import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const userListPageStyles = {
  base: style({}),

  headerTextWrapper: style({
    marginTop: `${getRem(20)}`,
    marginBottom: `${getRem(20)}`,
    padding: `0 ${getRem(20)}`,
  }),

  userListWrapper: style({
    padding: `0 ${getRem(20)}`,
  }),

  challengerWrapper: style({
    padding: `0 ${getRem(20)}`,
    marginBottom: `${getRem(20)}`,
  }),

  userList: style({
    display: 'flex',
    flexDirection: 'column',
    rowGap: `${getRem(20)}`,
    padding: `0 ${getRem(20)}`,
  }),
};
