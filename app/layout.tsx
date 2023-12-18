import classNames from 'classnames';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import AuthSession from './common/components/AuthSession';
import QueryProvider from './common/components/QueryProvider';
import IconLoader from './common/ui/assets/IconLoader';
import './common/ui/reset.css';
import './globals.css';
import { layoutStyle } from './layout.css';

const pretendardFont = localFont({
  src: [
    {
      path: '../public/fonts/Pretendard-Bold.woff2',
      style: 'bold',
    },
    {
      path: '../public/fonts/Pretendard-SemiBold.woff2',
      style: 'normal',
    },
    {
      path: '../public/fonts/Pretendard-Medium.woff2',
      style: 'normal',
    },
  ],
});

export const metadata: Metadata = {
  title: 'Root Layout',
  description: 'Root Layout',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={classNames(pretendardFont.className, layoutStyle)}>
        <AuthSession>
          <QueryProvider>
            <IconLoader />
            {children}
          </QueryProvider>
        </AuthSession>
      </body>
    </html>
  );
};

export default RootLayout;
