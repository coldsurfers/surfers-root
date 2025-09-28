import { Text, semantics } from '@coldsurfers/ocean-road';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const StyledMobileMenuBackground = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: ${semantics.color.background[4]};
  display: flex;
  flex-direction: column;
  z-index: 98;

  padding-top: 126px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const StyledMobileMenuText = styled(Text)`
  font-size: 24px;
  border-bottom: 1px solid ${semantics.color.border[2]};
  padding-bottom: 16px;
  color: ${semantics.color.foreground[1]};
`;
