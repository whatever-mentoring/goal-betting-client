'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

interface CertificateResultPageProps {
  params: {
    goalId: number;
    id: number;
  };
}

const SuccessDynamicPage = dynamic(
  () => import('@/app/(challenge)/(다짐 도전)/ui/Success/SuccessPage'),
  {
    ssr: false,
  },
);

const CertificateResultPage = ({ params }: CertificateResultPageProps) => {
  return (
    <Suspense>
      <SuccessDynamicPage goalId={params.goalId} goalProofId={params.id} />
    </Suspense>
  );
};

export default CertificateResultPage;
