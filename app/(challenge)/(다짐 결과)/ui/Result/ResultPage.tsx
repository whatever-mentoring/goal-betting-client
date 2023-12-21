import TransitionComponent, { Step } from '@/app/common/ui/Animated/TransitionComponent';
import Header from '@/app/common/ui/Header/Header';
import Image from 'next/image';
import { resultPageStyles } from './result.css';

interface ResultPageProps {}

interface ResultPageProps {
  steps: Step[];
}

const ResultPage = ({ steps }: ResultPageProps) => {
  return (
    <>
      <Header showBackButton />
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
    </>
  );
};

export default ResultPage;
