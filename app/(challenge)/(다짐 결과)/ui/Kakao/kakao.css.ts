import { vars } from '@/app/common/ui/colors.css';
import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const kakaoPageStyles = {
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
      marginBottom: `${getRem(20)}`,
    },
  ]),

  imageDownloadWrapper: style([flexCenterCenter, {}]),

  imageWrapper: style([
    flexCenterCenter,
    {
      width: `100%`,
      display: 'block',
      padding: `0 ${getRem(20)}`,
      borderRadius: `${getRem(16)}`,
    },
  ]),

  image: style({
    width: '100%',
    height: '100%',
    borderRadius: `${getRem(16)}`,
  }),
};
