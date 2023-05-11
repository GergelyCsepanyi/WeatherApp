import {makeAutoObservable} from 'mobx';
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
  forecast: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
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
  timeFormat: '12' | '24' = '12';

  string = new LocalizedStrings<TranslatedText>(texts);

  constructor() {
    makeAutoObservable(this);
    this.string.setLanguage(this.defaultLanguage);
  }

  private setTimeFormat = (timeFormat: '12' | '24') => {
    this.timeFormat = timeFormat;
  };

  changeLanguage(language: LanguagesValue) {
    if (language === this.language) {
      return;
    }
    this.string.setLanguage(language);
    this.language = language;
    switch (language) {
      case 'hu':
        this.setTimeFormat('24');
        break;
      case 'uk':
      case 'en':
        this.setTimeFormat('12');
        break;
    }
  }

  getLanguage() {
    return `${this.language}`;
  }
}
