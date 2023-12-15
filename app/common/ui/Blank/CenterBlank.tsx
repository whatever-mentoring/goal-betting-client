import { ReactNode } from 'react';
import { centerBlankStyles } from './centerBlank.css';

interface CenterBlankProps {
  children?: ReactNode;
}

const CenterBlank = ({ children }: CenterBlankProps) => {
  return <div className={centerBlankStyles.base}>{children}</div>;
};

export default CenterBlank;
