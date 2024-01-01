import { SkeletonBox } from '@/app/common/ui/Skeleton/Skeleton';
import { ReactNode } from 'react';
import { skeletonStyles } from './skeletonChallenge.css';

interface CompoundChallengeSkeletonProps {
  children: ReactNode;
}

const CompoundChallengeSkeleton = ({ children }: CompoundChallengeSkeletonProps) => {
  return <>{children}</>;
};

const LabelSkeleton = () => (
  <div className={skeletonStyles.labelWrapper}>
    <SkeletonBox className={skeletonStyles.skeletonLabel} />
  </div>
);

const ChallengeInfoSkeleton = () => (
  <div className={skeletonStyles.headerTextWrapper}>
    <SkeletonBox className={skeletonStyles.skeletonTitle} />
    <SkeletonBox className={skeletonStyles.skeletonText} />
  </div>
);

const ChallengeMainImageSkeleton = () => (
  <div className={skeletonStyles.mainImageWrapper}>
    <SkeletonBox className={skeletonStyles.mainImageBox} />
  </div>
);

const ChallengeBallImagesSkeleton = () => (
  <div className={skeletonStyles.gridContainer}>
    {[...Array(8)].map((_, index) => (
      <SkeletonBox key={index} className={skeletonStyles.gridItem} />
    ))}
  </div>
);

CompoundChallengeSkeleton.Label = LabelSkeleton;
CompoundChallengeSkeleton.ChallengeInfo = ChallengeInfoSkeleton;
CompoundChallengeSkeleton.ChallengeMainImage = ChallengeMainImageSkeleton;
CompoundChallengeSkeleton.ChallengeBallImages = ChallengeBallImagesSkeleton;

export default CompoundChallengeSkeleton;
