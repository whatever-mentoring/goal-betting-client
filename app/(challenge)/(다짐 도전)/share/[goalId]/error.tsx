'use client';
import navigationPath from '@/app/common/navigation/navigationPath';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Error = ({ error }: { error: Error }) => {
  const router = useRouter();
  useEffect(() => {
    if (error) {
      router.push(navigationPath.홈_페이지);
    }
  }, [error]);

  return <></>;
};

export default Error;
