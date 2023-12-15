'use client';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import { useFunnel } from '@/app/common/hooks/funnel/useFunnel';
import navigationPath from '@/app/common/navigation/navigationPath';
import useHandleResult, { Challenger, Participant } from './model/useHandleResult';
import KakaoDownloadPage from './ui/Kakao/KakaoDownloadPage';
import ResultPage from './ui/Result/ResultPage';
import SavePage from './ui/Save/SavePage';

export interface ChallengeResultFunnel {
  onNext: () => void;
  user: Challenger | Participant;
}

const page = () => {
  const [Funnel, setStep] = useFunnel(extractNonEmptyArrayKeys(navigationPath.다짐_결과_퍼널));

  const { result, steps } = useHandleResult({ setStep });

  return (
    <>
      <Funnel>
        <Funnel.Step name="도전_결과">
          <ResultPage steps={steps} />
        </Funnel.Step>
        <Funnel.Step name="도전_결과_저장">
          <SavePage user={result.user} />
        </Funnel.Step>
        <Funnel.Step name="도전_기프티콘">
          <KakaoDownloadPage user={result.user} />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default page;
