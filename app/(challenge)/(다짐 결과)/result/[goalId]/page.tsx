'use client';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import { useFunnel } from '@/app/common/hooks/funnel/useFunnel';
import navigationPath from '@/app/common/navigation/navigationPath';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import KakaoDownloadPage from '../../ui/Gifticon/GifticonDownloadPage';

export interface ChallengeResultFunnel {
  onNext: () => void;
}

const DynamicChallengeResultPage = dynamic(() => import('../../ui/Result/ResultPage'), {
  ssr: false,
});

const DynamicSavePage = dynamic(() => import('../../ui/Save/SavePage'), {
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
        <Suspense>
          <DynamicSavePage goalId={params.goalId} />
        </Suspense>
      </Funnel.Step>
      <Funnel.Step name="도전_기프티콘">
        <KakaoDownloadPage goalId={params.goalId} />
      </Funnel.Step>
    </Funnel>
  );
};

export default page;
