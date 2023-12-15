import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const challengePageStyles = {
  dateLeftWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
    },
  ]),

  dateLeftBox: style([
    flexCenterCenter,
    {
      backgroundColor: vars.color.purple400,
      borderRadius: `9999px`,
      padding: `${getRem(6)} ${getRem(18)}`,
    },
  ]),

  headerTextWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(16)}`,
      rowGap: `${getRem(10)}`,
      marginBottom: `${getRem(34)}`,
    },
  ]),

  fixedBox: style({
    position: 'fixed',
    width: `calc(100% - ${getRem(40)})`, // 20px * 2
    height: `60%`,
    top: '40%',
    left: `${getRem(20)}`,
    backgroundColor: vars.color.grey800,
    borderRadius: `${getRem(18)}`,
    zIndex: -1,
  }),

  mainImageWrapper: style([
    {
      display: 'flex',
      width: '100%',
      height: `calc(100dvh / 4)`,
      borderRadius: `${getRem(18)}`,
      marginBottom: `${getRem(34)}`,
      justifyContent: 'center',
    },
  ]),

  mainImageBox: style([
    flexCenterCenter,
    {
      width: '50%',
      height: '100%',
      position: 'relative',
      borderRadius: `${getRem(18)}`,
    },
  ]),

  mainImage: style({
    width: '100%',
    height: '100%',
    borderRadius: `${getRem(18)}`,
  }),

  gridContainer: style([
    flexCenterCenter,
    {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: `${getRem(8)}`,
      padding: `0 ${getRem(44)}`,
      marginBottom: `${getRem(12)}`,
    },
  ]),

  gridItem: style({
    display: 'flex',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }),

  gridSecondRow: style({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    padding: `0 calc(${getRem(44)} + 100vw / 10)`,
    gap: `${getRem(8)}`,
    marginBottom: `${getRem(24)}`,
  }),

  image: style({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  }),

  userCountWrapper: style([flexCenterCenter, {}]),
  textButtonStyles: style([
    flexCenterCenter,
    {
      padding: `${getRem(8)} ${getRem(16)}`,
      borderRadius: `${getRem(16)}`,
      transition: 'background-color 0.3s ease-in-out',
      selectors: {
        '&:active': {
          backgroundColor: vars.color.grey600,
        },
      },
    },
  ]),
};
