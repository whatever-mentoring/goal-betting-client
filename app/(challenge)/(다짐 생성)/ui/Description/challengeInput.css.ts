import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const challengeInputPageStyles = {
  inputWrapper: style([
    flexCenterCenter,
    {
      marginTop: `${getRem(29)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),

  boxCanvas: style([
    {
      marginTop: `${getRem(24)}`,
      padding: `${getRem(20)}`,
    },
  ]),

  boxWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      padding: `${getRem(20)}`,
      borderRadius: `${getRem(16)}`,
      backgroundColor: vars.color.grey800,
      rowGap: `${getRem(21)}`,
    },
  ]),

  imageWrapper: style([
    flexCenterCenter,
    {
      width: `${getRem(142)}`,
      height: `${getRem(190)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    width: `100%`,
    height: `100%`,
    objectFit: 'contain',
    borderRadius: `${getRem(16)}`,
  }),

  challengeExampleWrapper: style([flexCenterCenter]),
};
