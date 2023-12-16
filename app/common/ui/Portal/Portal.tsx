import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

const Portal = ({ children }: PortalProps) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const newContainer = document.createElement('div', { is: 'portal' });
    newContainer.setAttribute('id', 'portal');
    document.body.insertBefore(newContainer, document.body.firstChild);
    setContainer(newContainer);

    return () => {
      document.body.removeChild(newContainer);
    };
  }, []);

  if (!container) {
    return null;
  }

  return createPortal(children, container);
};

export default Portal;
