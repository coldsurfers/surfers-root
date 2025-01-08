'use client'

import { GLOBAL_Z_INDEX } from '@/libs/constants'
import { AnimatePresence, motion } from 'framer-motion'
import { memo } from 'react'

const POSITION_PADDING = 12

export const NavigationCityDropdown = memo(
  ({
    isOpen,
    onClose,
    position,
  }: {
    isOpen: boolean
    onClose: () => void
    position: {
      top: number
      left: number
    }
  }) => {
    // Dropdown animation
    const dropdownVariants = {
      hidden: { opacity: 0, y: -10 },
      visible: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -10 },
    }
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
            <motion.div
              className="dropdown"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={dropdownVariants}
              style={{
                position: 'absolute',
                top: `${position.top + POSITION_PADDING}px`,
                left: `${position.left}px`,
                background: 'white',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                padding: '10px',
                zIndex: GLOBAL_Z_INDEX.APP_HEADER + 2,
              }}
            >
              <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>Option 1</li>
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>Option 2</li>
                <li style={{ padding: '10px 15px', cursor: 'pointer' }}>Option 3</li>
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    )
  },
)
