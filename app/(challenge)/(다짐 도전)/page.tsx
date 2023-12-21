'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction, Suspense, useEffect, useState } from 'react';
import navigationPath, { 다짐_도전_퍼널_Key } from '../../common/navigation/navigationPath';
import { useGetChallengeListQuery } from './module/api/challengeList';

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
  const router = useRouter();

  const { data: challengeList } = useGetChallengeListQuery();
  const [currentChallengeId, setCurrentChallengeId] = useState<number | null>(null);

  useEffect(() => {
    if (!challengeList) return;
    if (challengeList?.data.length) {
      setCurrentChallengeId(challengeList.data[0].id);
    } else {
      router.push(navigationPath.다짐_생성_퍼널.다짐_입력, { scroll: false });
    }
  }, [challengeList]);

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
