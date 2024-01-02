import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const sharePageStyles = {
  labelWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'row',
      columnGap: `${getRem(12)}`,
    },
  ]),

  gifiticonBox: style([
    flexCenterCenter,
    {
      backgroundColor: vars.color.cyan800,
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
      marginBottom: `${getRem(18)}`,
    },
  ]),

  boxCanvas: style([
    {
      padding: `0 ${getRem(20)}`,
      marginTop: `${getRem(20)}`,
    },
  ]),

  boxWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      padding: `${getRem(20)}`,
      borderRadius: `${getRem(16)}`,
      backgroundColor: vars.color.grey800,
      rowGap: `${getRem(20)}`,
    },
  ]),

  imageWrapper: style([
    flexCenterCenter,
    {
      width: '100%',
      height: `${getRem(250)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: `${getRem(16)}`,
  }),

  downloadWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(34)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),

  downloadButton: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(12)}`,
      borderRadius: `${getRem(16)}`,
      height: `${getRem(87)}`,
      width: `100%`,
      backgroundColor: vars.color.grey800,
      transition: 'background-color 0.3s ease-in-out',
      selectors: {
        '&:active': {
          backgroundColor: vars.color.grey900,
        },
      },
    },
  ]),

  challengeTextWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
    },
  ]),
};
