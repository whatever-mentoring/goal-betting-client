import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter, flexCenterEnd } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const checkPageStyles = {
  inputImageWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(29)}`,
      padding: `0 ${getRem(20)}`,
      maxHeight: `${getRem(170)}`,
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
      top: `${getRem(14)}`,
      right: `${getRem(32)}`,
      width: `${getRem(30)}`,
      height: `${getRem(30)}`,
      cursor: 'pointer',
      zIndex: 1,
    },
  ]),

  imageWrapper: style([
    flexCenterCenter,
    {
      width: `calc(100%)`,
      height: `${getRem(170)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    height: `${getRem(170)}`,
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
    },
  ]),

  textAreaWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(34)}`,
      padding: `0 ${getRem(34)}`,
    },
  ]),

  textWrapper: style([
    {
      width: `100%`,
      backgroundColor: vars.color.grey800,
      padding: `${getRem(19)} ${getRem(21)}`,
      minHeight: `${getRem(129)}`,
      borderRadius: `${getRem(18)}`,
      marginBottom: `${getRem(6)}`,
    },
  ]),
  textCount: style([
    flexCenterEnd,
    {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      paddingTop: `${getRem(17)}`,
      paddingRight: `${getRem(20)}`,
    },
  ]),
};
