'use client';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Suspense, lazy } from 'react';
import ChallengeSkeleton from '../../loading';

const ChallengeDynamicPage = lazy(() => import('../../ui/Challenge/ChallengePage'));

const WithoutAuthDynamicChallengePage = dynamic(
  () => import('../../ui/Challenge/WithoutAuthChallengePage'),
  {
    ssr: false,
  },
);

const ChallengePage = ({ params }: { params: { goalId: number } }) => {
  const { data } = useSession();

  const isLogin = !!data?.user?.accessToken;

  return (
    <Suspense fallback={<ChallengeSkeleton />}>
      {!isLogin && <WithoutAuthDynamicChallengePage goalId={params.goalId} />}
      {!!isLogin && <ChallengeDynamicPage goalId={params.goalId} />}
    </Suspense>
  );
};

export default ChallengePage;
