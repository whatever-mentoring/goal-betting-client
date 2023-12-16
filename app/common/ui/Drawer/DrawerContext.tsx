'use client';
import { ReactNode, createContext, useContext, useState } from 'react';
import Drawer from './Drawer';

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export const useDrawer = () => {
  const context = useContext(DrawerContext);
  if (context === undefined) {
    throw new Error('DrawerContext로 감싸져있지 않습니다.');
  }
  return context;
};

interface DrawerProviderProps {
  children: ReactNode;
  drawerChildren?: ReactNode;
}

export const DrawerProvider = ({ children, drawerChildren }: DrawerProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = () => setIsOpen(true);
  const closeDrawer = () => setIsOpen(false);

  return (
    <DrawerContext.Provider value={{ isOpen, openDrawer, closeDrawer }}>
      {children}
      <Drawer isOpen={isOpen} onClose={closeDrawer}>
        {drawerChildren}
      </Drawer>
    </DrawerContext.Provider>
  );
};
