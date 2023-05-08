import {makeAutoObservable} from 'mobx';
// import {LanguagesValue} from '../localization';
import LocalizedStrings from 'react-native-localization';

type TranslatedText = {
  locationTabTitle: string;
  favouritesTabTitle: string;
  temperature: string;
};

export type LanguagesValue = 'hu' | 'uk' | 'en';
type LanguagesLabel = 'hu' | 'uk' | 'en';

export type Languages = {
  label: LanguagesLabel;
  value: LanguagesValue;
};
export const languages: Languages[] = [
  {label: 'hu', value: 'hu'},
  {label: 'uk', value: 'uk'},
  {label: 'en', value: 'en'},
];

export class LanguageStore {
  defaultLanguage: LanguagesValue = 'uk';
  language: LanguagesValue = this.defaultLanguage;

  hungarian = {
    locationTabTitle: 'HU Location',
    favouritesTabTitle: 'HU Favourites',
    temperature: 'HU Temperature',
  };

  ukrainian = {
    locationTabTitle: 'UK Location',
    favouritesTabTitle: 'UK Favourites',
    temperature: 'UK Temperature',
  };

  english = {
    locationTabTitle: 'Location',
    favouritesTabTitle: 'Favourites',
    temperature: 'Temperature',
  };

  string = new LocalizedStrings<TranslatedText>({
    hu: this.hungarian,
    uk: this.ukrainian,
    en: this.english,
  });

  constructor() {
    makeAutoObservable(this);
    this.changeLanguage(this.defaultLanguage);
  }

  changeLanguage(language: LanguagesValue) {
    console.log('change language to:', language);
    // TODO: infinite re-render loop....
    string.setLanguage(language);
    this.language = language;
    console.log('store lang changed to:', this.language);
    console.log('interface lang :', this.string.getInterfaceLanguage());
    // console.log('string value:', string);
  }

  getLanguage() {
    return `${this.language}`;
  }
}
