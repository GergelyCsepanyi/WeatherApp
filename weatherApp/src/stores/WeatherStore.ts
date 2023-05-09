import {makeAutoObservable} from 'mobx';
import {WeatherResponse} from '../services/WeatherAPI';
import {LanguagesValue} from './LanguageStore';

export type Weather = WeatherResponse;

export type UnitsType = 'metric' | 'standard' | 'imperial';

export type WeatherUnitType = 'K' | '°C' | 'F';

// export type WindSpeedUnitType = 'km/h' | 'mph';

const addWeather = (weathers: Weather[], weather: Weather): Weather[] => {
  console.log('weather to add:', weather);
  if (!weathers) {
    throw new Error('Weathers array is not exist');
  }
  if (!weather) {
    throw new Error('Weather is empty to add to the weathers');
  }
  if (!weathers.find(currentWeather => currentWeather.id === weather.id)) {
    return [...weathers, weather];
  }
  return weathers;
};

const removeWeather = (weathers: Weather[], id: number): Weather[] => {
  return weathers.filter(weather => weather.id !== id);
};

const getWeather = (weathers: Weather[], cityName: string): Weather | null => {
  const result = weathers.find(weather => weather.name === cityName);
  if (!result) {
    return null;
  }
  return result;
};

export class WeatherStore {
  weathers: Weather[] = [];

  units: UnitsType = 'metric';

  weatherUnit: WeatherUnitType = '°C';

  // windSpeedUnit: WindSpeedUnitType = 'km/h';

  constructor() {
    makeAutoObservable(this);
  }

  setUnits = (lang: LanguagesValue): void => {
    switch (lang) {
      case 'en':
        this.units = 'imperial';
        this.weatherUnit = 'K';
        // this.windSpeedUnit = 'mph';
        break;
      case 'hu':
      case 'uk':
        this.units = 'metric';
        this.weatherUnit = '°C';
        // this.windSpeedUnit = 'km/h';
        break;
      default:
        throw new Error('Not implemented Weather unit type');
    }
  };

  removeWeather(id: number) {
    this.weathers = removeWeather(this.weathers, id);
  }

  addWeather(weather: WeatherResponse) {
    this.weathers = addWeather(this.weathers, weather);
  }

  updateWeathers(weather: WeatherResponse) {
    removeWeather(this.weathers, weather.id);
    addWeather(this.weathers, weather);
  }

  getWeather(cityName: string) {
    return getWeather(this.weathers, cityName);
  }
}
