import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const loginPageStyles = {
  headerWrapper: style([
    flexCenterCenter,
    {
      flexDirection: 'column',
      marginTop: `${getRem(40)}`,
      rowGap: `${getRem(20)}`,
    },
  ]),
  imageWrapper: style([
    flexCenterCenter,
    {
      margin: `${getRem(135)}  0 ${getRem(20)} ${getRem(20)}`,
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
    borderRadius: `${getRem(16)}`,
  }),
};
