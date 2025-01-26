import styled from '@emotion/styled'
import { motion } from 'framer-motion'
import { LoaderCircle } from 'lucide-react'
import { semantics } from '../tokens'

const MotionIcon = motion.create(LoaderCircle)

export const StyledPageLoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const StyledSpinner = styled(MotionIcon)`
  color: ${semantics.color.foreground[1]};
  width: 32px;
  height: 32px;
`
