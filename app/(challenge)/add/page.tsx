'use client';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import navigationPath from '@/app/common/navigation/navigationPath';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFunnel } from '../../common/hooks/funnel/useFunnel';
import BetPage from '../ui/Bet/BetPage';
import ChallengeInputPage from '../ui/Description/ChallengeInputPage';
import PreviewPage from '../ui/Preview/PreviewPage';
import ResultPage from '../ui/Result/ResultPage';
import StartDatePage from '../ui/StartDate/StartDatePage';

export interface ChallengeFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
  onNext: () => void;
}

export interface Challenge {
  title: string;
  gifticon: {
    file: File | null;
  };
  startDate: dayjs.Dayjs | null;
}

const ChallengeAddFunnel = () => {
  const [Funnel, setStep] = useFunnel(extractNonEmptyArrayKeys(navigationPath.다짐_생성_퍼널));

  const [challenge, setChallenge] = useState<Challenge>({
    title: '',
    gifticon: {
      file: null,
    },
    startDate: null,
  });

  return (
    <Funnel>
      <Funnel.Step name="다짐_입력">
        <ChallengeInputPage
          challenge={challenge}
          setChallenge={setChallenge}
          onNext={() => setStep('기프티콘_업로드')}
        />
      </Funnel.Step>
      <Funnel.Step name="기프티콘_업로드">
        <BetPage
          challenge={challenge}
          setChallenge={setChallenge}
          onNext={() => setStep('다짐_시작일')}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_시작일">
        <StartDatePage
          challenge={challenge}
          setChallenge={setChallenge}
          onNext={() => setStep('다짐_등록_확인')}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_등록_확인">
        <PreviewPage
          challenge={challenge}
          setChallenge={setChallenge}
          onNext={() => setStep('다짐_등록_완료')}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_등록_완료">
        <ResultPage
          challenge={challenge}
          setChallenge={setChallenge}
          onNext={() => setStep('다짐_등록_완료')}
        />
      </Funnel.Step>
    </Funnel>
  );
};

export default ChallengeAddFunnel;
