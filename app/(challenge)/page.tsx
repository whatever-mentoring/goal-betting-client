'use client';

import { useFunnel } from '../common/hooks/funnel/useFunnel';

export interface ChallengerFunnelProps {
  onNext: () => void;
}

const ChallengePage = () => {
  const [Funnel] = useFunnel(['내기시작후_인증']);

  return (
    <Funnel>
      <></>
    </Funnel>
  );
};

export default ChallengePage;
