import { cache } from 'react';
import { apiClient } from '../openapi-client';

export const validateCityParam = cache(async (cityParam: string) => {
  const city = decodeURIComponent(cityParam);
  const countries = await apiClient.location.getCountries();
  const cities = countries.flatMap((c) => c.cities);

  const isValidCity = cities.some((c) => {
    return c.name === city;
  });
  if (!isValidCity) {
    return {
      isValid: false,
      data: null,
    } as const;
  }
  const remoteCity = cities.find((c) => c.name === city);
  if (!remoteCity) {
    return {
      isValid: false,
      data: null,
    } as const;
  }
  return {
    isValid: true,
    data: {
      ...remoteCity,
    },
  } as const;
});
