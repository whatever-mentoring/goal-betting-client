'use client';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicSettingsPage = dynamic(() => import('./ui/SettingsPage'), {
  ssr: false,
});

const SettingUserInfoPage = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <DynamicSettingsPage />
      </Suspense>
    </>
  );
};

export default SettingUserInfoPage;
