import getRem from '@/app/common/util/getRem';
import { style } from '@vanilla-extract/css';

// TODO : 추후 좀 더 정리 필요
// NOTE : 하단 고정 버튼 대응
export const layoutStyle = style({
  marginBottom: `${getRem(20)}`,
});
