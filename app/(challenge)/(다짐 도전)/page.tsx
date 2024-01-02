'use client';
import { Dispatch, SetStateAction, Suspense, lazy } from 'react';
import { 다짐_도전_퍼널_Key } from '../../common/navigation/navigationPath';
import ChallengeSkeleton from './loading';
import useHandleHomeRouting from './module/challenge/useHandleHomeRouting';

interface Certification {
  file: File | null;
  text: string;
}

export interface ChallengerFunnelProps {
  onNext: () => void;
  certification: Certification;
  setCertification: Dispatch<SetStateAction<Certification>>;
  setStep?: (step: 다짐_도전_퍼널_Key) => void;
}

const ChallengeDynamicPage = lazy(() => import('./ui/Challenge/ChallengePage'));

const ChallengeFunnel = () => {
  const { currentChallengeId, isLoading } = useHandleHomeRouting();

  if (isLoading) return <ChallengeSkeleton />;

  return (
    <>
      {!!currentChallengeId && (
        <Suspense fallback={<ChallengeSkeleton />}>
          <ChallengeDynamicPage goalId={currentChallengeId} />
        </Suspense>
      )}
    </>
  );
};

export default ChallengeFunnel;
