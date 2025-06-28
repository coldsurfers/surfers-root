import type { ZodScreenParams, zodScreen } from '@/lib';
import type { HomeStackScreenProps } from '@/navigations';

export type HomeScreenParams = ZodScreenParams<typeof zodScreen.HomeScreen>;

export type HomeScreenProps = HomeStackScreenProps<typeof zodScreen.HomeScreen.name>;
