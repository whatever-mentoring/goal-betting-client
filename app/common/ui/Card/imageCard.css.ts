import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { vars } from '../colors.css';
import { flexCenterCenter } from '../common.css';

export const imageCardStyles = {
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
      width: `${getRem(166)}`,
      height: `${getRem(205)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    objectFit: 'contain',
  }),

  challengeTextWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
    },
  ]),
};
