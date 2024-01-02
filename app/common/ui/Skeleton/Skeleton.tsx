import classNames from 'classnames';
import { skeletonAnimationStyles } from './skeletonAnimation.css';

export const SkeletonBox = ({ className }: { className?: string }) => (
  <div className={classNames(skeletonAnimationStyles.skeletonAnimation, className)} />
);

export const SkeletonBoxReverse = ({ className }: { className?: string }) => (
  <div className={classNames(skeletonAnimationStyles.skeletonAnimationReverse, className)} />
);
