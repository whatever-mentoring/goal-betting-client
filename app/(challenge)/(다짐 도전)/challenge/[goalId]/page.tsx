'use client';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const ChallengeDynamicPage = dynamic(() => import('../../ui/Challenge/ChallengePage'), {
  ssr: false,
});

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
    <Suspense>
      {!isLogin && <WithoutAuthDynamicChallengePage goalId={params.goalId} />}
      {!!isLogin && <ChallengeDynamicPage goalId={params.goalId} />}
    </Suspense>
  );
};

export default ChallengePage;
