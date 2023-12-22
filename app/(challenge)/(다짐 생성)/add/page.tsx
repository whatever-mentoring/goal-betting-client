'use client';
import RefreshCheck from '@/app/common/hooks/funnel/RefreshCheck';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import navigationPath from '@/app/common/navigation/navigationPath';
import dayjs from 'dayjs';
import { Dispatch, SetStateAction, useState } from 'react';
import { useFunnel } from '../../../common/hooks/funnel/useFunnel';
import BetPage from '../ui/Bet/BetPage';
import ChallengeInputPage from '../ui/Description/ChallengeInputPage';
import PreviewPage from '../ui/Preview/PreviewPage';
import StartDatePage from '../ui/StartDate/StartDatePage';

export interface ChallengeAddFunnelProps {
  challenge: Challenge;
  setChallenge: Dispatch<SetStateAction<Challenge>>;
  onNext: () => void;
}

export interface Challenge {
  title: string;
  gifticon: {
    imgSrc: string | null;
  };
  startDate: dayjs.Dayjs;
}

const ChallengeAddFunnel = () => {
  const [Funnel, setStep] = useFunnel(extractNonEmptyArrayKeys(navigationPath.다짐_생성_퍼널));

  const [challenge, setChallenge] = useState<Challenge>({
    title: '',
    gifticon: {
      imgSrc: null,
    },
    startDate: dayjs().add(1, 'day'),
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
        <RefreshCheck onRefresh={() => setStep('다짐_입력')}>
          <BetPage
            challenge={challenge}
            setChallenge={setChallenge}
            onNext={() => setStep('다짐_시작일')}
          />
        </RefreshCheck>
      </Funnel.Step>
      <Funnel.Step name="다짐_시작일">
        <RefreshCheck onRefresh={() => setStep('다짐_입력')}>
          <StartDatePage
            challenge={challenge}
            setChallenge={setChallenge}
            onNext={() => setStep('다짐_등록_확인')}
          />
        </RefreshCheck>
      </Funnel.Step>
      <Funnel.Step name="다짐_등록_확인">
        <RefreshCheck onRefresh={() => setStep('다짐_입력')}>
          <PreviewPage challenge={challenge} setChallenge={setChallenge} />
        </RefreshCheck>
      </Funnel.Step>
    </Funnel>
  );
};

export default ChallengeAddFunnel;
