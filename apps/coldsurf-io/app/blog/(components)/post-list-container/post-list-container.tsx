'use client';

import type { PropsWithChildren } from 'react';
import { StyledPostsContainer } from './post-list-container.styled';

export const PostListContainer = ({ children }: PropsWithChildren) => {
  return <StyledPostsContainer>{children}</StyledPostsContainer>;
};
