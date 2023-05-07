import {CityStore} from './CityStore';
import {LanguageStore} from './LanguageStore';
import {WeatherStore} from './WeatherStore';

export class RootStore {
  cityStore: CityStore;
  weatherStore: WeatherStore;
  languageStore: LanguageStore;

  constructor() {
    this.cityStore = new CityStore();
    this.weatherStore = new WeatherStore();
    this.languageStore = new LanguageStore();
  }
}
