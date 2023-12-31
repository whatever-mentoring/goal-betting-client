import { 다짐_결과_퍼널_Key } from '@/app/common/navigation/navigationPath';
import TransitionComponent from '@/app/common/ui/Animated/TransitionComponent';
import Header from '@/app/common/ui/Header/Header';
import useHandleResult from '../../module/result/useHandleResult';

interface ResultPageProps {
  setStep: (key: 다짐_결과_퍼널_Key) => void;
  goalId: number;
}

const ResultPage = ({ setStep, goalId }: ResultPageProps) => {
  const { steps } = useHandleResult({ setStep, goalId });
  return (
    <>
      <Header showBackButton />
      {steps && <TransitionComponent steps={steps} />}
    </>
  );
};

export default ResultPage;
