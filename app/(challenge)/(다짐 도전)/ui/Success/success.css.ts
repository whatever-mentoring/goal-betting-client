import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const successPageStyles = {
  wrapper: style([
    {
      backgroundColor: vars.color.background,
      padding: `${getRem(20)} 0`,
    },
  ]),

  dateLeftWrapper: style([
    flexCenterCenter,
    {
      marginBottom: `${getRem(20)}`,
    },
  ]),

  headerTextWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      rowGap: `${getRem(6)}`,
      marginBottom: `${getRem(10)}`,
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

  imageWrapper: style([
    flexCenterCenter,
    {
      width: `100%`,
      display: 'block',
      borderRadius: `${getRem(16)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),

  image: style({
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
    {
      flexDirection: 'column',
      marginTop: `${getRem(34)}`,
      padding: `0 ${getRem(40)}`,
    },
  ]),
};
