import {LoginStackScreenProp} from '../navigations/LoginStackNavigation.types';

export type EmailConfirmScreenParam = {
  email: string;
};

export type EmailConfirmScreenProp = LoginStackScreenProp<'EmailConfirmScreen'>;
