import {makeAutoObservable} from 'mobx';
import {WeatherResponse} from '../services/WeatherAPI';

export type Weather = WeatherResponse;

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

  constructor() {
    makeAutoObservable(this);
  }

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
