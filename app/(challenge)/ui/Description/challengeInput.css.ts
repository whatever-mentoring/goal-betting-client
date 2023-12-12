import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const challengeInputPageStyles = {
  inputWrapper: style([
    flexCenterCenter,
    {
      marginTop: `${getRem(29)}`,
      padding: `0 ${getRem(20)}`,
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
    borderRadius: `${getRem(16)}`,
  }),
};
