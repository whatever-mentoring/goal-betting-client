import { style } from '@vanilla-extract/css';

export const drawerStyles = {
  container: style({
    position: 'fixed',
    top: 0,
    right: 0,
    height: '100%',
    width: '66vw', // 화면 너비의 2 / 3
    backgroundColor: '#23252F',
    boxShadow: '-2px 0 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 99999,

    '@media': {
      'screen and (min-width: 480px)': {
        right: 'calc((100% - 480px) / 2)',
        width: '320px',
      },
    },
  }),

  closeButtonWrapper: style({
    display: 'flex',
    justifyContent: 'flex-end',
    padding: '1rem',
    cursor: 'pointer',
  }),

  containerOpen: style({
    transform: 'translateX(0%)',
  }),
  containerClose: style({
    transform: 'translateX(-100%)',
  }),

  overlayBase: style({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(35, 37, 47, 0.5)',
    zIndex: 2,
    cursor: 'pointer',
  }),
  overlayOpen: style({
    opacity: 1,
    visibility: 'visible',
  }),
  overlayClose: style({
    opacity: 0,
    visibility: 'hidden',
  }),
};
