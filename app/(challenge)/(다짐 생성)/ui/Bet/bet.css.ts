import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const betPageStyles = {
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

  inputImage: style({
    visibility: 'hidden',
    width: 0,
    height: 0,
  }),

  closeIconWrapper: style([
    {
      position: 'absolute',
      top: `${getRem(20)}`,
      right: `${getRem(40)}`,
      width: `${getRem(30)}`,
      height: `${getRem(30)}`,
      cursor: 'pointer',
    },
  ]),

  imageWrapper: style([
    flexCenterCenter,
    {
      margin: `${getRem(29)}  0 ${getRem(20)} ${getRem(20)}`,
      width: `calc(100% - ${getRem(40)})`,
      height: `${getRem(250)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    width: `100%`,
    height: `100%`,
    objectFit: 'cover',
    boxSizing: 'border-box',
    borderRadius: `${getRem(16)}`,
  }),

  imageUploadBox: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(12)}`,
      width: `100%`,
      height: `${getRem(177)}`,
      backgroundColor: vars.color.grey800,
      borderRadius: `${getRem(16)}`,
      transition: 'background-color 0.3s ease-in-out',
      selectors: {
        '&:active': {
          backgroundColor: vars.color.grey700,
        },
      },
    },
  ]),

  imageUploadTextWrapper: style({
    marginTop: `${getRem(12)}`,
    padding: `0 ${getRem(40)}`,
  }),

  imageUploadText: style({
    whiteSpace: 'pre-wrap',
  }),

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
      transition: 'background-color 0.3s ease-in-out',
      selectors: {
        '&:active': {
          backgroundColor: vars.color.grey700,
        },
      },
    },
  ]),

  underLineText: style({
    paddingBottom: `${getRem(5)}`,
    borderBottom: `1px solid ${vars.color.grey600}`,
  }),
};
