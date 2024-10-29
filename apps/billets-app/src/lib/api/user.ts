import {AxiosResponse} from 'axios';
import {User} from '../../types/User';
import axiosClient from './axiosClient';

export const getUser = () => {
  return axiosClient.get<User, AxiosResponse<User>>('/api/user/me');
};
