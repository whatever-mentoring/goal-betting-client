'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicUserListPage = dynamic(() => import('../../../ui/UserList/UserListInfo'), {
  ssr: false,
});

const UserListPage = ({ params }: { params: { goalId: number } }) => {
  return (
    <Suspense>
      <DynamicUserListPage params={params} />
    </Suspense>
  );
};

export default UserListPage;
