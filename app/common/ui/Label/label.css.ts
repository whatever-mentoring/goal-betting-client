import { style } from '@vanilla-extract/css';
import getRem from '../../util/getRem';
import { flexCenterCenter } from '../common.css';

export const labelStyles = {
  labelBox: style([
    flexCenterCenter,
    {
      borderRadius: `9999px`,
      padding: `${getRem(6)} ${getRem(18)}`,
    },
  ]),
};
