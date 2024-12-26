import { semantics } from '@coldsurfers/ocean-road'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { EllipsisVertical } from 'lucide-react'

export const StyledShareButton = styled(motion.button)`
  background-color: initial;
  border: none;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledShareIcon = styled(EllipsisVertical)`
  width: 24px;
  height: 24px;
  color: ${semantics.color.foreground[1]};
`
