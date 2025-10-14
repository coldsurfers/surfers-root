'use client';

import { Text, media, semantics } from '@coldsurfers/ocean-road';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { type PropsWithChildren, forwardRef } from 'react';

export const StyledMenuText = styled(Text)`
  color: ${semantics.color.foreground[3]};
`;

export const StyledMenuItem = styled.div<{ $isHighlighted?: boolean }>`
  padding: 11px 16px;
  border-radius: 8px;

  align-self: flex-start;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  ${(props) =>
    props.$isHighlighted &&
    css`
      background-color: ${semantics.color.background[4]};
    `}
`;

export const AppHeaderMenuTextSkeleton = styled.div`
  width: 80px;
  height: 36px;
  border-radius: 4px;
  background-color: ${semantics.color.background[4]};

  margin-right: 0.75rem;

  ${media.medium(css`
    width: 120px;
    height: 24px;
  `)}
`;

const MenuItemComponent = forwardRef<HTMLDivElement, { $isHighlighted?: boolean }>((props, ref) => {
  return <StyledMenuItem ref={ref} {...props} />;
});

const MenuItemMotion = motion.create(MenuItemComponent);

export const HeaderMenuItem = ({
  children,
  isLoading,
  isCurrent = false,
  icon,
}: PropsWithChildren<{ isLoading?: boolean; isCurrent?: boolean; icon?: React.ReactNode }>) => {
  if (isLoading) {
    return <AppHeaderMenuTextSkeleton />;
  }
  return (
    <MenuItemMotion
      whileHover={{
        backgroundColor: semantics.color.background[4],
        transition: { duration: 0.2 },
      }}
      $isHighlighted={isCurrent}
    >
      {icon}
      {typeof children === 'string' ? (
        <StyledMenuText as="span">{children}</StyledMenuText>
      ) : (
        children
      )}
    </MenuItemMotion>
  );
};
