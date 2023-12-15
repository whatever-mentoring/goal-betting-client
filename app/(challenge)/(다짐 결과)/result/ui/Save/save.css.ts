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

  imageWrapper: style([
    flexCenterCenter,
    {
      width: `100%`,
      display: 'block',
      borderRadius: `${getRem(16)}`,
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

  allImageWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      padding: `0 ${getRem(20)}`,
      height: `calc(100dvh - ${getRem(52 + 120)})`,
    },
  ]),

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
  }),
};
