'use client';
import dynamic from 'next/dynamic';
import { Dispatch, SetStateAction, Suspense } from 'react';
import { 다짐_도전_퍼널_Key } from '../../common/navigation/navigationPath';
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

const ChallengeDynamicPage = dynamic(() => import('./ui/Challenge/ChallengePage'), {
  ssr: false,
});

const ChallengeFunnel = () => {
  const { currentChallengeId } = useHandleHomeRouting();

  return (
    <>
      {!!currentChallengeId && (
        <Suspense fallback={<div></div>}>
          <ChallengeDynamicPage goalId={currentChallengeId} />
        </Suspense>
      )}
    </>
  );
};

export default ChallengeFunnel;
