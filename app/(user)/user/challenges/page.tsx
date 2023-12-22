'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicChallengePage = dynamic(() => import('./ui/ChallengeList/ChallengeListPage'), {
  ssr: false,
});

const ChallengesPage = () => {
  return (
    <Suspense fallback={<div></div>}>
      <DynamicChallengePage />
    </Suspense>
  );
};

export default ChallengesPage;
