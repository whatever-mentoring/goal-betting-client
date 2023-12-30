'use client';
import { useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicSharePage = dynamic(() => import('../../ui/Share/SharePage'), {
  ssr: false,
});

const WithoutAuthDynamicSharePage = dynamic(() => import('../../ui/Share/WithoutAuthSharePage'), {
  ssr: false,
});

const ShareChallengePage = ({ params }: { params: { goalId: number } }) => {
  const { data } = useSession();
  return (
    <>
      {!data?.user?.accessToken && (
        <Suspense fallback={<></>}>
          <WithoutAuthDynamicSharePage params={params} />
        </Suspense>
      )}
      {!!data?.user.accessToken && (
        <Suspense fallback={<></>}>
          <DynamicSharePage params={params} />
        </Suspense>
      )}
    </>
  );
};

export default ShareChallengePage;
