'use client';

import { match } from 'ts-pattern';
import FacebookLogo from '../../../public/icons/sns/facebook/facebook.svg';
import InstaLogo from '../../../public/icons/sns/instagram/logo.svg';
import XLogo from '../../../public/icons/sns/x/x.svg';

interface Props extends React.SVGProps<SVGSVGElement> {
  social: 'instagram' | 'x' | 'facebook';
}

export const SNSIcon = ({ social, ...svgProps }: Props) => {
  const Component = match(social)
    .with('instagram', () => InstaLogo)
    .with('x', () => XLogo)
    .with('facebook', () => FacebookLogo)
    .exhaustive();

  return <Component {...svgProps} />;
};
