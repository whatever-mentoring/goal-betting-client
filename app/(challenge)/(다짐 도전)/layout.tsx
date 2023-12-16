import { DrawerProvider } from '@/app/common/ui/Drawer/DrawerContext';
import LoginDrawer from '@/app/common/ui/Drawer/LoginDrawer';
import { withFixedButtonScrollView } from '@/app/common/ui/common.css';
import { Metadata } from 'next';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: '다짐 도전',
  description: '다짐 도전 인증 페이지',
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <main className={withFixedButtonScrollView}>
        <DrawerProvider drawerChildren={<LoginDrawer />}>{children}</DrawerProvider>
      </main>
    </>
  );
};

export default Layout;
