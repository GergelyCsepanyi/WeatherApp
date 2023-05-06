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
  if (weathers.length === 0) {
    console.log('weathers is empty, put the value in');
    weathers.push(weather);
    return weathers;
  }
  if (weathers.find(currentWeather => currentWeather.id === weather.id)) {
    console.log('Weather is already inside');
    return weathers;
  }
  weathers.push(weather);
  return weathers;
};

const removeWeather = (weathers: Weather[], id: number): Weather[] => {
  if (!weathers) {
    throw new Error('Weathers array is not exist');
  }
  if (!id) {
    throw new Error('ID to delete from weathers is missing!');
  }
  return weathers.filter(weather => weather.id !== id);
};

export class WeatherStore {
  weathers: Weather[] = [];

  //isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  // setIsLoading(value: boolean) {
  //   this.isLoading = value;
  // }

  removeWeather(id: number) {
    if (!this.weathers || this.weathers.length === 0) {
      return;
    }
    this.weathers = removeWeather(this.weathers, id);
  }

  addWeather(weather: WeatherResponse) {
    this.weathers = addWeather(this.weathers, weather);
  }

  updateWeathers(weather: WeatherResponse) {
    removeWeather(this.weathers, weather.id);
    addWeather(this.weathers, weather);
  }

  getCurrentWeather(cityName: string) {
    console.log('weathers:');
    if (!this.weathers || this.weathers.length === 0) {
      return null;
    }
    const result = this.weathers.find(weather => weather.name === cityName);
    if (!result) {
      return null;
    }
    return result;
  }
}
