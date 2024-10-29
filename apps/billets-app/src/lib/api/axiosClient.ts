import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {storageAuthTokenKey} from '../contexts/constants';
import {API_BASE_URL} from '../constants';

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
});

export const applyConfig = async () => {
  axiosClient.interceptors.request.use(
    async config => {
      const token = await AsyncStorage.getItem(storageAuthTokenKey);
      if (!config.headers) {
        config.headers = {};
      }
      if (token && !config.headers.Authorization) {
        config.headers.Authorization = `${token}`;
      }
      return config;
    },
    error => {
      console.error(error);
      throw error;
    },
  );
};

export default axiosClient;
