import { style } from '@vanilla-extract/css';
import { flexCenterCenter } from './common/ui/common.css';
import getRem from './common/util/getRem';

export const layoutStyle = style({});

export const errorStyles = {
  container: style({
    width: '100%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  imageWrapper: style({
    position: 'relative',
    width: '100vw',
    height: 'calc(100vh / 3)',
  }),
  image: style({
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  }),
  textWrapper: style([flexCenterCenter, { marginTop: `${getRem(20)}` }]),

  text: style({
    fontSize: '3rem',
  }),
};
