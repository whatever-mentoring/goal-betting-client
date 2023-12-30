import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const loginPageStyles = {
  headerWrapper: style([
    flexCenterCenter,
    {
      marginTop: `${getRem(40)}`,
      rowGap: `${getRem(20)}`,
    },
  ]),
  logoImageWrapper: style([
    flexCenterCenter,
    {
      margin: `${getRem(47)}  0 ${getRem(20)} ${getRem(20)}`,
      width: `${getRem(140)}`,
      height: `${getRem(140)}`,
      position: 'relative',
      borderRadius: `${getRem(16)}`,
      '@media': {
        'screen and (min-width: 480px)': {
          width: `${getRem(200)}`,
          height: `${getRem(200)}`,
        },
      },
    },
  ]),
  logoImage: style({
    objectFit: 'contain',
  }),
  imageWrapper: style([
    flexCenterCenter,
    {
      position: 'fixed',
      left: '50%',
      bottom: `${getRem(80)}`,
      transform: 'translateX(-50%)',
      width: `100%`,
      height: `${getRem(400)}`,
      borderRadius: `${getRem(16)}`,
      '@media': {
        'screen and (max-width: 480px)': {
          width: `100%`,
          height: `${getRem(340)}`,
        },
      },
    },
  ]),
  image: style({
    objectFit: 'contain',
  }),
};
