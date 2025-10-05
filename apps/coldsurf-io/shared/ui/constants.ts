import { FEATURE_FLAGS } from '@/libs/constants';

export const APP_HEADER_HEIGHT = '100px';
export const HEADER_MENU_ITEMS = [
  {
    link: '/browse',
    title: '공연 및 전시',
    target: undefined,
    visible: true,
  },
  {
    link: '/tattoo',
    title: 'Tattoo',
    target: undefined,
    visible: FEATURE_FLAGS.useTattooFeature,
  },
  {
    link: '/store/registration',
    title: '입점하기',
    target: undefined,
    visible: FEATURE_FLAGS.useStoreRegistrationFeature,
  },
  {
    link: '/about',
    title: '소개',
    target: undefined,
    visible: true,
  },
  {
    link: '/blog',
    title: '블로그',
    target: undefined,
    visible: true,
  },
] as const;
