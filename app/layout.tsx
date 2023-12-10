import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import './common/ui/reset.css';
import IconLoader from './common/ui/assets/IconLoader';

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
      <body className={pretendardFont.className}>
        <IconLoader />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
