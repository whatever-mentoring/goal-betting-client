'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChallengeDynamicPage = dynamic(() => import('../../ui/Challenge/ChallengePage'), {
  ssr: false,
});

const ChallengePage = ({ params }: { params: { goalId: number } }) => {
  return (
    <Suspense>
      <ChallengeDynamicPage goalId={params.goalId} />
    </Suspense>
  );
};

export default ChallengePage;
