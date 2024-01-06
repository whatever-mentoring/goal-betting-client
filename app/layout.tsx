import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import classNames from 'classnames';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import AuthSession from './common/components/AuthSession';
import QueryProvider from './common/components/QueryProvider';
import IconLoader from './common/ui/assets/IconLoader';
import './common/ui/reset.css';
import './globals.css';
import { childStyle, layoutStyle } from './layout.css';

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
  metadataBase: new URL('https://mirr-dajim.co.kr'),
  twitter: {
    card: 'summary_large_image',
    title: '미르었던 다짐',
    description: '미르었던 다짐 - 미르었던 다짐',
    images: [
      {
        url: 'https://whatever-storage.s3.ap-northeast-2.amazonaws.com/mirr/mirr_half.png',
        width: 800,
        height: 600,
        alt: '미르었던 다짐',
      },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '미르었던 다짐',
    description: '미르었던 다짐 - 미르었던 다짐',
    images: [
      {
        url: 'https://whatever-storage.s3.ap-northeast-2.amazonaws.com/mirr/mirr_half.png',
        width: 800,
        height: 600,
        alt: '미르었던 다짐',
      },
    ],
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={classNames(pretendardFont.className, layoutStyle)}>
        <AuthSession>
          <QueryProvider>
            <IconLoader />
            <div className={childStyle}>
              {children}
              <Analytics />
              <SpeedInsights />
            </div>
          </QueryProvider>
        </AuthSession>
      </body>
    </html>
  );
};

export default RootLayout;
