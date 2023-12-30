import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

export const previewPageStyles = {
  headerTextWrapper: style({
    marginTop: `${getRem(16)}`,
    marginBottom: `${getRem(29)}`,
  }),
};
