import {
  API_GEODB_CITIES_URL,
  API_GEODB_CITIES_HOST_KEY,
  API_GEODB_CITIES_HOST_VALUE,
  API_GEODB_CITIES_TOKEN_KEY,
  API_GEODB_CITIES_TOKEN_VALUE,
} from '@env';
import {APIType, request} from './apiManager';

const URL = API_GEODB_CITIES_URL;
const HOST_KEY = API_GEODB_CITIES_HOST_KEY;
const HOST_VALUE = API_GEODB_CITIES_HOST_VALUE;
const TOKEN_KEY = API_GEODB_CITIES_TOKEN_KEY;
const TOKEN_VALUE = API_GEODB_CITIES_TOKEN_VALUE;

export type CityResponse = {
  city: string;
  country: string;
  countryCode: string;
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  population: number;
  region: string;
  regionCode: string;
  regionWdId: string;
  type: string;
  wikiDataId: string;
};

export interface CitiesApiInterface {
  fetchCities: (cityPrefix: string) => Promise<CityResponse[] | null>;
  fetchCitiesByLocation: (
    latitude: number,
    longitude: number,
  ) => Promise<CityResponse[] | null>;
}

const formatValue = (value: number): string => {
  if (value >= 0) {
    return `%2B${value}`;
  }
  return value.toString();
};

class CitiesApi implements CitiesApiInterface {
  fetchCities = (cityPrefix: string) => {
    const url = `${URL}?namePrefix=${cityPrefix}`;
    const options = {
      method: 'GET',
      headers: {
        [HOST_KEY]: HOST_VALUE,
        [TOKEN_KEY]: TOKEN_VALUE,
      },
    };

    return request<CityResponse[]>(APIType.citiesAPI, url, options);
  };

  fetchCitiesByLocation = (latitude: number, longitude: number) => {
    const location = `${formatValue(latitude)}${formatValue(longitude)}`;
    const url = `${URL}?location=${location}`;
    const options = {
      method: 'GET',
      headers: {
        [HOST_KEY]: HOST_VALUE,
        [TOKEN_KEY]: TOKEN_VALUE,
      },
    };

    return request<CityResponse[]>(APIType.citiesAPI, url, options);
  };
}
export const citiesApi = new CitiesApi();
