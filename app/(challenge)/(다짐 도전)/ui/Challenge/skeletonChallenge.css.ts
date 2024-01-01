// skeletonStyles.css.ts
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';
import { challengePageStyles } from './challenge.css';

export const skeletonStyles = {
  labelWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
    },
  ]),

  skeletonLabel: style({
    width: `${getRem(60)}`,
    height: getRem(23),
    borderRadius: `9999px`,
  }),

  headerTextWrapper: style([challengePageStyles.headerTextWrapper, {}]),

  skeletonTitle: style({
    width: '50%',
    height: getRem(20),
    borderRadius: `9999px`,
  }),

  skeletonText: style({
    width: '40%',
    height: getRem(14),
    borderRadius: `9999px`,
  }),

  mainImageWrapper: style([challengePageStyles.mainImageWrapper]),

  mainImageBox: style({
    width: '50%',
    height: '80%',
    borderRadius: `${getRem(18)}`,
  }),

  gridContainer: style([challengePageStyles.gridContainer, {}]),

  gridItem: style([
    {
      display: 'flex',
      boxSizing: 'border-box',
      position: 'relative',
      justifyContent: 'center',
      padding: `${getRem(8)}`,
      borderRadius: `${getRem(18)}`,
      height: getRem(75),
      width: getRem(75),
    },
  ]),
};
