'use client';

import { match } from 'ts-pattern';
import AppleLogo from '../../../public/icons/brand/apple.svg';

interface Props extends React.SVGProps<SVGSVGElement> {
  brand: 'apple';
}

export const BrandIcon = ({ brand, ...svgProps }: Props) => {
  const Component = match(brand)
    .with('apple', () => AppleLogo)
    .exhaustive();

  return <Component {...svgProps} />;
};
