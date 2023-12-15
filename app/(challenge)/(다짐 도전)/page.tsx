'use client';

import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import { extractNonEmptyArrayKeys } from '../../common/hooks/funnel/models';
import { useFunnel } from '../../common/hooks/funnel/useFunnel';
import navigationPath from '../../common/navigation/navigationPath';
import useChallengeData from './model/challenge/useChallengeData';
import CertificationPage from './ui/Certification/CertificationPage';
import ChallengePage from './ui/Challenge/ChallengePage';
import CheckPage from './ui/Check/CheckPage';
import SuccessPage from './ui/Success/SuccessPage';

interface Certification {
  file: File | null;
  text: string;
}

export interface ChallengerFunnelProps {
  onNext: () => void;
  certification: Certification;
  setCertification: Dispatch<SetStateAction<Certification>>;
}

const ChallengeFunnel = () => {
  const funnelStep = useMemo(() => extractNonEmptyArrayKeys(navigationPath.다짐_도전_퍼널), []);
  const [Funnel, setStep] = useFunnel(funnelStep);

  const [certification, setCertification] = useState<Certification>({
    file: null,
    text: '',
  });

  const { buttonInfo } = useChallengeData();

  return (
    <Funnel>
      <Funnel.Step name="다짐_도전">
        <ChallengePage
          buttonText={buttonInfo.text}
          onNext={() => setStep(buttonInfo.link)}
          certification={certification}
          setCertification={setCertification}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_인증">
        <CertificationPage
          onNext={() => setStep('다짐_인증_확인')}
          certification={certification}
          setCertification={setCertification}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_인증_확인">
        <CheckPage
          onNext={() => setStep('다짐_인증_완료')}
          certification={certification}
          setCertification={setCertification}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_인증_완료">
        <SuccessPage certification={certification} setCertification={setCertification} />
      </Funnel.Step>
    </Funnel>
  );
};

export default ChallengeFunnel;
