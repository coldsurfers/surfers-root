'use client';

import { match } from 'ts-pattern';
import AppleLogo from '../../../public/icons/brand/apple.svg';
import GoogleLogo from '../../../public/icons/brand/google.svg';

interface Props extends React.SVGProps<SVGSVGElement> {
  brand: 'apple' | 'google';
}

export const BrandIcon = ({ brand, ...svgProps }: Props) => {
  const Component = match(brand)
    .with('apple', () => AppleLogo)
    .with('google', () => GoogleLogo)
    .exhaustive();

  return <Component {...svgProps} />;
};
