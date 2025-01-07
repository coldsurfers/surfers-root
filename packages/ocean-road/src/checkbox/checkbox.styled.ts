import styled from '@emotion/styled'
import { Check } from 'lucide-react'
import { semantics } from '../tokens'

const sizesStringify = (size: 'lg' | 'md' | 'sm') => {
  switch (size) {
    case 'lg':
      return '32px'
    case 'md':
      return '24px'
    case 'sm':
      return '16px'
  }
}

export const StyledCheckboxLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;

  position: relative;
`

export const StyledCheckboxInput = styled.input<{ $size: 'lg' | 'md' | 'sm' }>`
  appearance: none;
  width: ${({ $size }) => sizesStringify($size)};
  height: ${({ $size }) => sizesStringify($size)};
  border: 2px solid #333;
  border-radius: 4px;
  background-color: #fff;
  margin-right: 8px;
  position: relative;

  &:checked {
    background-color: ${semantics.color.background[4]};
    border-color: ${semantics.color.background[4]};
  }

  &:checked + svg {
    display: block;
  }
`

export const StyledCheckboxIcon = styled(Check)<{ size: 'lg' | 'md' | 'sm' }>`
  position: absolute;
  top: 6px;
  left: 6px;

  width: ${({ size }) => `calc(${sizesStringify(size)} - 4px)`};
  height: ${({ size }) => `calc(${sizesStringify(size)} - 4px)`};
  display: none; /* Hidden by default */
`
