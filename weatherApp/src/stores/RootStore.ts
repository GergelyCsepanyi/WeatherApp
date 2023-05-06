import {CityStore} from './CityStore';
import {WeatherStore} from './WeatherStore';

export class RootStore {
  cityStore: CityStore;
  weatherStore: WeatherStore;

  constructor() {
    this.cityStore = new CityStore();
    this.weatherStore = new WeatherStore();
  }
}
