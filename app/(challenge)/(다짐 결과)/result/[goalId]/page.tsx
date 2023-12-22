'use client';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import { useFunnel } from '@/app/common/hooks/funnel/useFunnel';
import navigationPath from '@/app/common/navigation/navigationPath';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import KakaoDownloadPage from '../../ui/Kakao/KakaoDownloadPage';
import SavePage from '../../ui/Save/SavePage';

export interface ChallengeResultFunnel {
  onNext: () => void;
}

const DynamicChallengeResultPage = dynamic(() => import('../../ui/Result/ResultPage'), {
  ssr: false,
});

const page = ({ params }: { params: { goalId: number } }) => {
  const [Funnel, setStep] = useFunnel(
    extractNonEmptyArrayKeys(navigationPath.다짐_결과_퍼널(params.goalId)),
  );

  return (
    <Funnel>
      <Funnel.Step name="도전_결과">
        <Suspense>
          <DynamicChallengeResultPage setStep={setStep} goalId={params.goalId} />
        </Suspense>
      </Funnel.Step>
      <Funnel.Step name="도전_결과_저장">
        <SavePage />
      </Funnel.Step>
      <Funnel.Step name="도전_기프티콘">
        <KakaoDownloadPage />
      </Funnel.Step>
    </Funnel>
  );
};

export default page;
