import { flexCenterBetween, flexCenterStart } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const settingsPageStyles = {
  container: style({
    padding: `0 ${getRem(20)}`,
  }),
  headerTextWrapper: style([
    flexCenterStart,
    {
      padding: `0 ${getRem(20)}`,
      marginTop: `${getRem(20)}`,
      marginBottom: `${getRem(41)}`,
    },
  ]),
  textAreaWrapper: style({
    display: 'flex',
    flexDirection: 'column',
    padding: `0 ${getRem(20)}`,
    selectors: {
      '&:not(:last-child)': {
        marginBottom: `${getRem(30)}`,
      },
    },
  }),
  textAreaDescriptionAndButtonWrapper: style([
    flexCenterBetween,
    {
      padding: `0 ${getRem(17.5)}`,
      marginBottom: `${getRem(10)}`,
    },
  ]),

  stateButtonWrapper: style([
    flexCenterStart,
    {
      columnGap: `${getRem(10)}`,
    },
  ]),
};
