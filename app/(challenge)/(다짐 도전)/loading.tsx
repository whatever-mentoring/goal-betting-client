'use client';
import Header from '@/app/common/ui/Header/Header';
import SkeletonBottomFixed from '@/app/common/ui/Skeleton/SkeletonBottomFixed';
import { ButtonIcon } from '@/app/common/ui/assets/Icon';
import CompoundChallengeSkeleton from './ui/Challenge/SkeletonCompoundChallengePage';

const ChallengeSkeleton = () => {
  return (
    <>
      <Header appendingRightButton={<ButtonIcon name="menu" fill="white" size="l" />} />
      <CompoundChallengeSkeleton>
        <CompoundChallengeSkeleton.Label />
        <CompoundChallengeSkeleton.ChallengeInfo />
        <CompoundChallengeSkeleton.ChallengeMainImage />
        <CompoundChallengeSkeleton.ChallengeBallImages />
      </CompoundChallengeSkeleton>
      <SkeletonBottomFixed />
    </>
  );
};

export default ChallengeSkeleton;
