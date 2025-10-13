import { FEATURE_FLAGS } from '@/libs/constants';
import {
  BookOpen as BookOpenIcon,
  HeartHandshake as HeartHandshakeIcon,
  Rss as RssIcon,
  Ticket as TicketIcon,
} from 'lucide-react';

export const APP_HEADER_HEIGHT = '100px';
export const HEADER_MENU_ITEMS = [
  {
    link: '/browse',
    title: '공연 및 전시',
    target: undefined,
    visible: true,
    isDefaultHeader: true,
    subPaths: ['/event', '/venue'],
    icon: TicketIcon,
  },
  {
    link: '/tattoo',
    title: 'Tattoo',
    target: undefined,
    visible: FEATURE_FLAGS.useTattooFeature,
    isDefaultHeader: false,
    subPaths: [],
    icon: TicketIcon,
  },
  {
    link: '/store/registration',
    title: '입점하기',
    target: undefined,
    visible: FEATURE_FLAGS.useStoreRegistrationFeature,
    isDefaultHeader: false,
    subPaths: [],
    icon: TicketIcon,
  },
  {
    link: '/partners',
    title: '협업하기',
    target: undefined,
    visible: FEATURE_FLAGS.useWorkWithUsFeature,
    isDefaultHeader: false,
    subPaths: [],
    icon: HeartHandshakeIcon,
  },
  {
    link: '/about',
    title: '소개',
    target: undefined,
    visible: false,
    isDefaultHeader: false,
    subPaths: [],
    icon: BookOpenIcon,
  },
  {
    link: '/official-blog',
    title: '공식 블로그',
    target: undefined,
    visible: true,
    isDefaultHeader: true,
    subPaths: [],
    icon: RssIcon,
  },
] as const;
