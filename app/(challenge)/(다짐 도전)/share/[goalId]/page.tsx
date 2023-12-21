import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicSharePage = dynamic(() => import('../../ui/Share/SharePage'), {
  ssr: false,
});

const ShareChallengePage = ({ params }: { params: { goalId: number } }) => {
  return (
    <Suspense fallback={<></>}>
      <DynamicSharePage params={params} />
    </Suspense>
  );
};

export default ShareChallengePage;
