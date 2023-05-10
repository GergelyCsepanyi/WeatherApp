import {
  API_CURRENTWEATHER_TOKEN,
  API_CURRENTWEATHER_URL,
  API_WEATHERFORECAST_HOST_KEY,
  API_WEATHERFORECAST_HOST_VALUE,
  API_WEATHERFORECAST_TOKEN_KEY,
  API_WEATHERFORECAST_TOKEN_VALUE,
  API_WEATHERFORECAST_URL,
} from '@env';
import {APIType, request} from './apiManager';

const CURRENTWEATHER_URL = API_CURRENTWEATHER_URL;
const CURRENTWEATHER_TOKEN = API_CURRENTWEATHER_TOKEN;

const WEATHERFORECAST_URL = API_WEATHERFORECAST_URL;
const WEATHERFORECAST_TOKEN_KEY = API_WEATHERFORECAST_TOKEN_KEY;
const WEATHERFORECAST_TOKEN_VALUE = API_WEATHERFORECAST_TOKEN_VALUE;
const WEATHERFORECAST_HOST_KEY = API_WEATHERFORECAST_HOST_KEY;
const WEATHERFORECAST_HOST_VALUE = API_WEATHERFORECAST_HOST_VALUE;

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

export type WeatherForecastDailyWeatherType = {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    maxwind_mph: number;
    maxwind_kph: number;
    totalprecip_mm: number;
    totalprecip_in: number;
    totalsnow_cm: number;
    avgvis_km: number;
    avgvis_miles: number;
    avghumidity: number;
    daily_will_it_rain: number;
    daily_chance_of_rain: number;
    daily_will_it_snow: number;
    daily_chance_of_snow: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    uv: number;
  };
  astro: {
    sunrise: string;
    sunset: string;
    moonrise: string;
    moonset: string;
    moon_phase: string;
    moon_illumination: string;
    is_moon_up: number;
    is_sun_up: number;
  };
};

export type WeatherForecastResponse = {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime_epoch: number;
    localtime: string;
  };
  forecast: {
    forecastday: WeatherForecastDailyWeatherType[];
  };
};

export interface WeatherApiInterface {
  fetchWeather: (
    longitude: number,
    latitude: number,
    units: WeatherUnits,
    lang: WeatherLangs,
  ) => Promise<WeatherResponse | null>;

  fetchWeatherForecast: (
    longitude: number,
    latitude: number,
    lang: WeatherLangs,
    days: number,
  ) => Promise<WeatherForecastResponse | null>;
}

const getTomorrowDate = () => {
  const today = new Date();

  today.setDate(today.getDate() + 1);

  return today.toISOString();
};

const getDate = (day: number) => {
  const today = new Date();

  today.setDate(today.getDate() + day);

  return today.toISOString();
};

class WeatherApi implements WeatherApiInterface {
  fetchWeather = (
    longitude: number,
    latitude: number,
    units: WeatherUnits,
    lang: WeatherLangs,
  ) => {
    const url = `${CURRENTWEATHER_URL}?lat=${latitude}&lon=${longitude}&units=${units}&lang=${lang}&appid=${CURRENTWEATHER_TOKEN}`;
    const options = {
      method: 'GET',
    };
    return request<WeatherResponse>(APIType.weatherAPI, url, options);
  };

  fetchWeatherForecast = (
    longitude: number,
    latitude: number,
    lang: WeatherLangs,
    days: number = 3,
    dateFromFetchWeather: string = getTomorrowDate() + ',' + getDate(2),
  ) => {
    const url = `${WEATHERFORECAST_URL}?q=${latitude},${longitude}&days=${days}&lang=${lang}&dt=${dateFromFetchWeather}`;
    const options = {
      method: 'GET',
      headers: {
        [WEATHERFORECAST_TOKEN_KEY]: WEATHERFORECAST_TOKEN_VALUE,
        [WEATHERFORECAST_HOST_KEY]: WEATHERFORECAST_HOST_VALUE,
      },
    };

    console.log('URL:', url, 'OPTIONS:', options);

    return request<WeatherForecastResponse>(
      APIType.weatherForecastAPI,
      url,
      options,
    );
  };
}

export const weatherApi = new WeatherApi();
