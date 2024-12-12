import { NavigatorScreenParams } from '@react-navigation/native'
import { z } from 'zod'
import { zodNavigation, zodScreen } from './constants'

type TypeofZodNavigation = (typeof zodNavigation)[keyof typeof zodNavigation]
export type ZodNavigationParams<T extends TypeofZodNavigation> = z.infer<T['params']>

type TypeofZodScreen = (typeof zodScreen)[keyof typeof zodScreen]
export type ZodNavigationParamList<T extends (TypeofZodScreen | TypeofZodNavigation)[]> = {
  [K in T[number] as K['name']]: K extends TypeofZodNavigation
    ? NavigatorScreenParams<NavigatorScreenParams<z.infer<K['params']>>>
    : K extends TypeofZodScreen
      ? z.infer<K['params']>
      : never
}

export type ZodScreenParams<T extends TypeofZodScreen> = z.infer<T['params']>
