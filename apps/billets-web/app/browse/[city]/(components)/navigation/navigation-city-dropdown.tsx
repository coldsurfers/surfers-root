'use client';

import { GLOBAL_Z_INDEX } from '@/libs/constants';
import { AnimatePresence, motion } from 'framer-motion';
import type { CSSProperties, ReactNode } from 'react';
import { NavigationDropdownMotionDiv } from './navigation.styled';

const POSITION_PADDING = 12;

type RenderItem<ItemT> = (item: ItemT) => ReactNode;

type NavigationCityDropdownProps<ItemT> = {
  isOpen: boolean;
  onClose: () => void;
  data: Array<ItemT>;
  renderItem: RenderItem<ItemT>;
  keyExtractor?: (item: ItemT) => string;
  position: {
    top: number;
    left: number;
  };
  className?: string;
  style?: CSSProperties;
};

export const NavigationCityDropdown =
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  <ItemT = any>({
    isOpen,
    onClose,
    position,
    data,
    renderItem,
    keyExtractor,
    className,
    style,
  }: NavigationCityDropdownProps<ItemT>) => {
    // Dropdown animation
    const dropdownVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    };
    return (
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="backdrop"
              onClick={onClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'black',
                zIndex: GLOBAL_Z_INDEX.APP_HEADER + 1,
              }}
            />

            {/* Dropdown Menu */}
            <NavigationDropdownMotionDiv
              className={className}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              style={{
                top: `${position.top + POSITION_PADDING}px`,
                left: `${position.left}px`,
                maxHeight: '470px',
                overflowY: 'scroll',
                ...style,
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {data.map((value, index) => {
                  return <li key={keyExtractor?.(value) ?? index}>{renderItem(value)}</li>;
                })}
              </ul>
            </NavigationDropdownMotionDiv>
          </>
        )}
      </AnimatePresence>
    );
  };
