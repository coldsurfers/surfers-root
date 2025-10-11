import { FEATURE_FLAGS } from '@/libs/constants';

export const APP_HEADER_HEIGHT = '100px';
export const HEADER_MENU_ITEMS = [
  {
    link: '/browse',
    title: '공연 및 전시',
    target: undefined,
    visible: true,
    isDefaultHeader: true,
    subPaths: ['/event'],
  },
  {
    link: '/tattoo',
    title: 'Tattoo',
    target: undefined,
    visible: FEATURE_FLAGS.useTattooFeature,
    isDefaultHeader: false,
    subPaths: [],
  },
  {
    link: '/store/registration',
    title: '입점하기',
    target: undefined,
    visible: FEATURE_FLAGS.useStoreRegistrationFeature,
    isDefaultHeader: false,
    subPaths: [],
  },
  {
    link: '/partners',
    title: '협업하기',
    target: undefined,
    visible: FEATURE_FLAGS.useWorkWithUsFeature,
    isDefaultHeader: false,
    subPaths: [],
  },
  {
    link: '/about',
    title: '소개',
    target: undefined,
    visible: true,
    isDefaultHeader: false,
    subPaths: [],
  },
  {
    link: '/blog',
    title: '블로그',
    target: undefined,
    visible: true,
    isDefaultHeader: true,
    subPaths: [],
  },
] as const;
