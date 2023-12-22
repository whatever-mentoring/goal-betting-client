import { 다짐_결과_퍼널_Key } from '@/app/common/navigation/navigationPath';
import TransitionComponent from '@/app/common/ui/Animated/TransitionComponent';
import Header from '@/app/common/ui/Header/Header';
import Image from 'next/image';
import useHandleResult from '../../module/result/useHandleResult';
import { resultPageStyles } from './result.css';

interface ResultPageProps {
  setStep: (key: 다짐_결과_퍼널_Key) => void;
  goalId: number;
}

const ResultPage = ({ setStep, goalId }: ResultPageProps) => {
  const { steps } = useHandleResult({ setStep, goalId });
  return (
    <>
      <Header showBackButton />
      {steps && (
        <TransitionComponent steps={steps}>
          <div className={resultPageStyles.imageWrapper}>
            <Image
              src="/images/dog.png"
              width={100}
              height={100}
              layout="responsive"
              alt="challenge-info"
              className={resultPageStyles.image}
            />
          </div>
        </TransitionComponent>
      )}
    </>
  );
};

export default ResultPage;
