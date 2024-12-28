import { AnimatePresence, motion, Variants } from 'framer-motion'
import { MobileMenuProps } from './mobile-menu.types'

export function MobileMenu({ isOpen }: MobileMenuProps) {
  // Animation variants
  const menuVariants: Variants = {
    hidden: {
      x: '100%', // Start off-screen to the right
    },
    visible: {
      x: 0, // Slide into view
      transition: {
        type: 'tween',
        duration: 0.25,
        stiffness: 60,
        damping: 12,
      },
    },
    exit: {
      x: '100%', // Slide out to the right
      transition: {
        type: 'tween',
        duration: 0.25,
        stiffness: 60,
        damping: 12,
      },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={menuVariants}
          style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            backgroundColor: '#222',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1,
          }}
        >
          <h1>Menu</h1>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            <li style={{ margin: '20px 0' }}>
              <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>
                Home
              </a>
            </li>
            <li style={{ margin: '20px 0' }}>
              <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>
                About
              </a>
            </li>
            <li style={{ margin: '20px 0' }}>
              <a href="#services" style={{ color: '#fff', textDecoration: 'none' }}>
                Services
              </a>
            </li>
            <li style={{ margin: '20px 0' }}>
              <a href="#contact" style={{ color: '#fff', textDecoration: 'none' }}>
                Contact
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
