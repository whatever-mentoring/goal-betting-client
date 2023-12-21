'use client';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import { useFunnel } from '@/app/common/hooks/funnel/useFunnel';
import navigationPath from '@/app/common/navigation/navigationPath';
import useHandleResult from '../../module/result/useHandleResult';
import KakaoDownloadPage from '../../ui/Kakao/KakaoDownloadPage';
import ResultPage from '../../ui/Result/ResultPage';
import SavePage from '../../ui/Save/SavePage';

export interface ChallengeResultFunnel {
  onNext: () => void;
}

const page = ({ params }: { params: { goalId: number } }) => {
  const [Funnel, setStep] = useFunnel(
    extractNonEmptyArrayKeys(navigationPath.다짐_결과_퍼널(params.goalId)),
  );

  const { steps } = useHandleResult({ setStep, goalId: params.goalId });

  return (
    <>
      <Funnel>
        <Funnel.Step name="도전_결과">{steps && <ResultPage steps={steps} />}</Funnel.Step>
        <Funnel.Step name="도전_결과_저장">
          <SavePage />
        </Funnel.Step>
        <Funnel.Step name="도전_기프티콘">
          <KakaoDownloadPage />
        </Funnel.Step>
      </Funnel>
    </>
  );
};

export default page;
