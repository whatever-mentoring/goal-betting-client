import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { flexCenterCenter } from '../common.css';

export const transitionStyles = {
  container: style({
    position: 'relative',
    overflow: 'hidden',
    height: `calc(100dvh - ${getRem(52)})`,
  }),
  text: style({
    position: 'absolute',
    width: '100%',
    left: '50%',
    transform: 'translateX(-70%)',
    transition: 'transform 0.5s ease-out',
  }),
  buttonWrapper: style({
    position: 'absolute',
    left: '50%',
    bottom: getRem(23),
    width: '100%',
    transform: 'translateX(-50%)',
    transition: 'transform 0.5s ease-out',
    padding: `0 ${getRem(20)}`,
  }),

  enterFromRight: style({
    transform: 'translateX(150%)',
  }),
  exitToLeft: style({
    transform: 'translateX(-200%)',
  }),
  center: style({
    transform: 'translateX(-50%)',
  }),
  childrenWrapper: style({
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    top: `${getRem(52)}`,
    left: '50%',
    width: '100%',
    minHeight: `calc(100dvh - ${getRem(200)})`,
    transform: 'translateX(-50%)',
    transition: 'transform 0.5s ease-out',
  }),
  imageWrapper: style([
    flexCenterCenter,
    {
      width: `100%`,
      height: `${getRem(400)}`,
      margin: `0 ${getRem(20)}`,
      borderRadius: `${getRem(16)}`,
      position: 'relative',
    },
  ]),
  image: style({
    objectFit: 'contain',
  }),
};
