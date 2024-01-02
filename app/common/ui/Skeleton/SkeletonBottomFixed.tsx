import { SkeletonBox } from './Skeleton';
import { skeletonBottomFixedStyle } from './skeletonBottomFixed.css';

const SkeletonBottomFixed = () => {
  return (
    <div className={skeletonBottomFixedStyle.base}>
      <SkeletonBox className={skeletonBottomFixedStyle.button} />
    </div>
  );
};

export default SkeletonBottomFixed;
