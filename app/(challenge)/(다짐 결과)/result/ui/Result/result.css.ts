import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const resultPageStyles = {
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
