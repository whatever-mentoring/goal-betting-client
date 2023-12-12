import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const previewPageStyles = {
  boxWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      margin: `${getRem(34)} ${getRem(20)} ${getRem(20)} ${getRem(20)}`,
      borderRadius: `${getRem(16)}`,
      backgroundColor: vars.color.grey800,
      rowGap: `${getRem(20)}`,
    },
  ]),

  imageWrapper: style([
    flexCenterCenter,
    {
      width: '100%',
      height: `${getRem(200)}`,
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

  challengeTextWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
      marginBottom: `${getRem(20)}`,
    },
  ]),
};
