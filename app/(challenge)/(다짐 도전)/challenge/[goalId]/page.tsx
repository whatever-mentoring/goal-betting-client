'use client';

import RefreshCheck from '@/app/common/hooks/funnel/RefreshCheck';
import { extractNonEmptyArrayKeys } from '@/app/common/hooks/funnel/models';
import { useFunnel } from '@/app/common/hooks/funnel/useFunnel';
import navigationPath, { 다짐_도전_퍼널_Key } from '@/app/common/navigation/navigationPath';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import CertificationPage from '../../ui/Certification/CertificationPage';
import CheckPage from '../../ui/Check/CheckPage';

interface Certification {
  imageSrc: string | null;
  text: string;
}

export interface ChallengeCertificationFunnelProps {
  onNext: () => void;
  certification: Certification;
  setCertification: Dispatch<SetStateAction<Certification>>;
  setStep?: (step: 다짐_도전_퍼널_Key) => void;
}

const ChallengeFunnel = ({ params }: { params: { goalId: number } }) => {
  const funnelStep = useMemo(
    () => extractNonEmptyArrayKeys(navigationPath.다짐_도전_퍼널(params.goalId)),
    [],
  );
  const [Funnel, setStep] = useFunnel(funnelStep);

  const [certification, setCertification] = useState<Certification>({
    imageSrc: null,
    text: '',
  });

  return (
    <Funnel>
      <Funnel.Step name="다짐_인증">
        <CertificationPage
          onNext={() => setStep('다짐_인증_확인')}
          certification={certification}
          setCertification={setCertification}
        />
      </Funnel.Step>
      <Funnel.Step name="다짐_인증_확인">
        <RefreshCheck onRefresh={() => setStep('다짐_인증')}>
          <CheckPage
            certification={certification}
            setCertification={setCertification}
            params={params}
            onNext={() => navigationPath.다짐_인증_확인_페이지(params.goalId)}
          />
        </RefreshCheck>
      </Funnel.Step>
    </Funnel>
  );
};

export default ChallengeFunnel;
