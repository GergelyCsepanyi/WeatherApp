import {makeAutoObservable} from 'mobx';
// import {LanguagesValue} from '../localization';
import LocalizedStrings from 'react-native-localization';
import {texts} from '../localization';

export type TranslatedText = {
  lang: string;
  today: string;
  locationTabTitle: string;
  favouritesTabTitle: string;
  temperature: string;
  minTemperature: string;
  maxTemperature: string;
  mainWeatherCondition: string;
  sunset: string;
  sunrise: string;
  wind: string;
  humidity: string;
  clouds: string;
  visibility: string;
  searchCity: string;
  favouriteCities: string;
  cancel: string;
  noDataFound: string;
};

type LanguagesLabel = 'HU' | 'UK' | 'EN';
export type LanguagesValue = 'hu' | 'uk' | 'en';

export type Languages = {
  label: LanguagesLabel;
  value: LanguagesValue;
};
export const languages: Languages[] = [
  {label: 'HU', value: 'hu'},
  {label: 'UK', value: 'uk'},
  {label: 'EN', value: 'en'},
];

export class LanguageStore {
  defaultLanguage: LanguagesValue = 'uk';
  language: LanguagesValue = this.defaultLanguage;

  string = new LocalizedStrings<TranslatedText>(texts);

  constructor() {
    makeAutoObservable(this);
    this.string.setLanguage(this.defaultLanguage);
  }

  changeLanguage(language: LanguagesValue) {
    if (language === this.language) {
      return;
    }
    this.string.setLanguage(language);
    this.language = language;
  }

  getLanguage() {
    return `${this.language}`;
  }
}
