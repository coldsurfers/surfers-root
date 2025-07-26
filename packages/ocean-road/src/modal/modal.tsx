import { AnimatePresence, motion } from 'framer-motion';
import type { PropsWithChildren } from 'react';
import { semantics } from '../tokens';

export const Modal = ({
  children,
  visible,
  onClose,
  zIndex,
}: PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  zIndex?: number;
}>) => {
  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.25 }}
            exit={{ opacity: 0 }}
            style={{
              background: semantics.color.dimmed[1],
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              zIndex,
            }}
          />

          <motion.dialog
            open={visible}
            className="modal-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
            style={{
              background: 'transparent',
              position: 'fixed',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              border: 'none',
              zIndex: zIndex ? zIndex + 1 : undefined,
            }}
          >
            {children}
          </motion.dialog>
        </>
      )}
    </AnimatePresence>
  );
};
