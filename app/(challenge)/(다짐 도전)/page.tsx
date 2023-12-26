'use client';
import { isTodayIsAfterEndDate } from '@/app/common/util/date';
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
    // 내가 만든 챌린지 중에 진행중인 챌린지가 있으면 해당 챌린지로 이동
    if (challengeList?.data && challengeList.data.length > 0) {
      const firstChallenge = challengeList.data[0];
      // 챌린지가 시작전이면 공유 페이지로 이동
      if (!isTodayIsAfterEndDate(firstChallenge.startDate)) {
        router.push(navigationPath.다짐_공유_페이지(firstChallenge.id), { scroll: false });
        return;
      }
      // 챌린지가 진행중이면 챌린지 페이지로 이동
      setCurrentChallengeId(firstChallenge.id);
      return;
    }
    // 챌린지가 없으면 다짐 생성 퍼널로 이동
    router.push(navigationPath.다짐_생성_퍼널.다짐_입력, { scroll: false });
  }, [challengeList]);

  return (
    <>
      {!!currentChallengeId && (
        <Suspense fallback={<div></div>}>
          <ChallengeDynamicPage goalId={6} />
        </Suspense>
      )}
    </>
  );
};

export default ChallengeFunnel;
