import { flexCenterCenter } from '@/app/common/ui/common.css';
import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const nicknamePageStyles = {
  inputWrapper: style([
    flexCenterCenter,
    {
      marginTop: `${getRem(29)}`,
      padding: `0 ${getRem(20)}`,
    },
  ]),
};
