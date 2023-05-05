import {makeAutoObservable} from 'mobx';
import {WeatherResponse, weatherApi} from '../services/WeatherAPI';

export type Weather = WeatherResponse;

const addWeather = (weathers: Weather[], weather: Weather): Weather[] => [
  ...weathers,
  weather,
];

const removeWeather = (weathers: Weather[], id: number): Weather[] =>
  weathers.filter(weather => weather.id !== id);

class Weathers {
  weathers: Weather[] = [];

  isLoading = true;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  removeWeather(id: number) {
    this.weathers = removeWeather(this.weathers, id);
  }

  addWeather(weather: WeatherResponse) {
    if (
      this.weathers.find(currentWeather => currentWeather.id === weather.id)
    ) {
      return;
    }
    this.weathers = addWeather(this.weathers, weather);
  }

  updateWeathers(weather: WeatherResponse) {
    removeWeather(this.weathers, weather.id);
    addWeather(this.weathers, weather);
  }

  getCurrentWeather(cityName: string) {
    const result = this.weathers.find(weather => weather.name === cityName);
    if (!result) {
      return null;
    }
    return result;
  }
}

const store = new Weathers();

export default store;
