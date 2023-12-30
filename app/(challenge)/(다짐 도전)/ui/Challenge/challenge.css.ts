import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const challengePageStyles = {
  labelWrapper: style([
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
      marginBottom: `${getRem(24)}`,
    },
  ]),

  mainImageWrapper: style([
    {
      display: 'flex',
      width: '100%',
      height: `calc(100dvh / 3)`,
      borderRadius: `${getRem(18)}`,
      marginBottom: `${getRem(10)}`,
      justifyContent: 'center',
    },
  ]),

  mainImageBox: style([
    flexCenterCenter,
    {
      position: 'relative',
      borderRadius: `${getRem(18)}`,
      width: `${getRem(155)}`,
      height: `${getRem(196)}`,
      '@media': {
        'screen and (min-width: 480px)': {
          width: `${getRem(200)}`,
          height: `${getRem(240)}`,
        },
      },
    },
  ]),

  mainImage: style({
    objectFit: 'contain',
    borderRadius: `${getRem(18)}`,
  }),

  gridContainer: style([
    {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: `${getRem(24)} ${getRem(15)}`,
      padding: `0 ${getRem(44)}`,
    },
  ]),

  gridItem: style({
    display: 'flex',
    boxSizing: 'border-box',
    position: 'relative',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    padding: `${getRem(8)}`,
    backgroundColor: vars.color.grey800,
    borderRadius: `${getRem(18)}`,
  }),

  image: style({
    width: '100%',
    height: '100%',
    borderRadius: '50%',
  }),

  imageLabel: style([
    flexCenterCenter,
    {
      position: 'absolute',
      bottom: `-${getRem(7.5)}`,
      padding: `${getRem(5)} ${getRem(15)}`,
      backgroundColor: '#50486A',
      borderRadius: `${getRem(10)}`,
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
    },
  ]),

  userCountWrapper: style([
    flexCenterCenter,
    {
      marginBottom: `${getRem(5)}`,
    },
  ]),

  blankBox: style([
    flexCenterCenter,
    {
      width: '90%',
      height: '90%',
      backgroundColor: vars.color.grey700,
      borderRadius: '50%',
    },
  ]),

  textButtonStyles: style([
    flexCenterCenter,
    {
      boxSizing: 'border-box',
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
