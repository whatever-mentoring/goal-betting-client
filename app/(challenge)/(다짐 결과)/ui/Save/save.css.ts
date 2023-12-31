import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const savePageStyles = {
  wrapper: style([
    {
      backgroundColor: '#22272F',
      padding: `${getRem(20)} 0`,
    },
  ]),

  dateLeftWrapper: style([
    flexCenterCenter,
    {
      marginBottom: `${getRem(20)}`,
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
      rowGap: `${getRem(6)}`,
      marginBottom: `${getRem(10)}`,
      height: `${getRem(60)}`,
    },
  ]),

  closeIconWrapper: style([
    {
      position: 'absolute',
      top: `${getRem(14)}`,
      right: `${getRem(32)}`,
      width: `${getRem(30)}`,
      height: `${getRem(30)}`,
      cursor: 'pointer',
      zIndex: 1,
    },
  ]),

  inputImageWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(29)}`,
      padding: `0 ${getRem(20)}`,
      position: 'relative',
      cursor: 'pointer',
    },
  ]),

  linkButtonWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(34)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),

  linkButton: style([
    flexCenterCenter,
    {
      backgroundColor: vars.color.grey800,
      borderRadius: `${getRem(16)}`,
      height: `${getRem(87)}`,
      width: `100%`,
    },
  ]),

  textAreaWrapper: style([
    {
      flexDirection: 'column',
      marginTop: `${getRem(34)}`,
      padding: `0 ${getRem(40)}`,
    },
  ]),

  boxCanvas: style([
    {
      padding: `0 ${getRem(35)}`,
      marginTop: `15dvh`,
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
      width: `${getRem(152)}`,
      height: `${getRem(186)}`,
      position: 'relative',
      '@media': {
        'screen and (max-width: 480px)': {
          width: `${getRem(152)}`,
          height: `${getRem(186)}`,
        },
      },
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
