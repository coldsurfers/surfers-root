import type { NavigatorScreenParams } from '@react-navigation/native';
import type { z } from 'zod';
import type { zodNavigation, zodScreen } from './constants';

type TypeofZodNavigation = (typeof zodNavigation)[keyof typeof zodNavigation];
export type ZodNavigationParams<T extends TypeofZodNavigation> = z.infer<T['params']>;

type TypeofZodScreen = (typeof zodScreen)[keyof typeof zodScreen];
// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export type ZodNavigationParamList<T extends Record<string, any>> = {
  [K in keyof T]: T[K] extends TypeofZodNavigation
    ? NavigatorScreenParams<z.infer<T[K]['params']>>
    : T[K];
};
// export type ZodNavigationParamList<T extends (TypeofZodScreen | TypeofZodNavigation)[]> = {
//   [K in T[number] as K['name']]: K extends TypeofZodNavigation
//     ? NavigatorScreenParams<NavigatorScreenParams<z.infer<K['params']>>>
//     : K extends TypeofZodScreen
//       ? z.infer<K['params']>
//       : never
// }

export type ZodScreenParams<T extends TypeofZodScreen> = z.infer<T['params']>;
