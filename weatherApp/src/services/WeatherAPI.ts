import {API_CURRENTWEATHER_TOKEN, API_CURRENTWEATHER_URL} from '@env';
import {APIType, request} from './apiManager';

const URL = API_CURRENTWEATHER_URL;
const TOKEN = API_CURRENTWEATHER_TOKEN;

type WeatherResponseWeatherItem = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

export type WeatherLangs = 'hu' | 'uk' | 'en';

export type WeatherUnits = 'metric' | 'standard' | 'imperial';

export type WeatherResponse = {
  coord: {
    lon: number;
    lat: number;
  };
  id: number;
  name: string;
  weather: WeatherResponseWeatherItem[];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  rain?: {
    '1h'?: number;
    '3h'?: number;
  };
  snow?: {
    '1h'?: number;
    '3h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
};

type WeatherForecastWeatherType = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: [
    {
      id: number;
      main: 'Rain';
      description: 'light rain';
      icon: '10d';
    },
  ];
  speed: 2.7;
  deg: 209;
  gust: 3.58;
  clouds: 53;
  pop: 0.7;
  rain: 2.51;
};

export type WeatherForecastResponse = {
  city: {
    id: 3163858;
    name: 'Zocca';
    coord: {
      lon: 10.99;
      lat: 44.34;
    };
    country: 'IT';
    population: 4593;
    timezone: 7200;
  };
  cod: '200';
  message: 0.0582563;
  cnt: 7;
  list: [];
};

export interface WeatherApiInterface {
  fetchWeather: (
    longitude: number,
    latitude: number,
    units: WeatherUnits,
    lang: WeatherLangs,
  ) => Promise<WeatherResponse | null>;
}

class WeatherApi implements WeatherApiInterface {
  fetchWeather = (
    longitude: number,
    latitude: number,
    units: WeatherUnits,
    lang: WeatherLangs,
  ) => {
    const url = `${URL}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${TOKEN}`;
    const options = {
      method: 'GET',
    };
    return request<WeatherResponse>(APIType.weatherAPI, url, options);
  };
}

export const weatherApi = new WeatherApi();
