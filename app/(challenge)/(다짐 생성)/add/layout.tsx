import type { Metadata } from 'next';
import { layoutStyle } from './layout.css';

export const metadata: Metadata = {
  title: 'Root Layout',
  description: 'Root Layout',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body className={layoutStyle}>{children}</body>
    </html>
  );
};

export default RootLayout;
