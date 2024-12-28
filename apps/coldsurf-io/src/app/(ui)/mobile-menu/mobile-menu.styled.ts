import { semantics } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const StyledMobileMenuBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${semantics.color.background[4]};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
`
