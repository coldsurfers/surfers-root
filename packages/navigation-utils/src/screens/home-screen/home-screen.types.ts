import type { HomeStackScreenProps } from '../../navigations/home-stack-navigation';
import type { ZodScreenParams, zodScreen } from '../../utils';

export type HomeScreenParams = ZodScreenParams<typeof zodScreen.HomeScreen>;

export type HomeScreenProps = HomeStackScreenProps<typeof zodScreen.HomeScreen.name>;
