import { DrawerProvider } from '@/app/common/ui/Drawer/DrawerContext';
import LoginDrawer from '@/app/common/ui/Drawer/LoginDrawer';
import { withFixedButtonScrollView } from '@/app/common/ui/common.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Root Layout',
  description: 'Root Layout',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className={withFixedButtonScrollView}>
      <DrawerProvider drawerChildren={<LoginDrawer />}>{children}</DrawerProvider>
    </main>
  );
};

export default RootLayout;
