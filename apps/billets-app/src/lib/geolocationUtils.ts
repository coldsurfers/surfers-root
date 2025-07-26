import Geolocation, { type GeolocationResponse } from '@react-native-community/geolocation';

const geolocationUtils = {
  getCurrentLocation: () => {
    return new Promise<GeolocationResponse>((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
        },
        {}
      );
    });
  },
};

export default geolocationUtils;
