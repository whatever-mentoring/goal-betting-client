import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import Portal from '../Portal/Portal';
import { ButtonIcon } from '../assets/Icon';
import { drawerStyles } from './drawer.css';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Drawer = ({ isOpen, onClose, children }: DrawerProps) => {
  const overlayVariants = {
    open: { opacity: 1 },
    closed: { opacity: 0 },
  };

  const drawerVariants = {
    open: { x: '0%' },
    closed: { x: '100%' },
  };
  return (
    <Portal>
      <AnimatePresence>
        {!!isOpen && (
          <>
            <motion.div
              className={classNames(drawerStyles.overlayBase)}
              onClick={onClose}
              initial="closed"
              animate="open"
              exit="closed"
              variants={overlayVariants}
              transition={{ duration: 0.3 }}
              key="overlay"
            />
            <motion.div
              className={classNames(
                drawerStyles.container,
                isOpen ? drawerStyles.containerOpen : drawerStyles.containerClose,
              )}
              initial="closed"
              animate="open"
              exit="closed"
              variants={drawerVariants}
              transition={{ duration: 0.3 }}
              key="drawer"
            >
              <div className={drawerStyles.closeButtonWrapper}>
                <ButtonIcon name="close" size="m" fill={'white'} onClick={onClose} />
              </div>
              {children}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Portal>
  );
};

export default Drawer;
