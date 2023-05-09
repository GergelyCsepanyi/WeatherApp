import {makeAutoObservable} from 'mobx';
// import {LanguagesValue} from '../localization';
import LocalizedStrings from 'react-native-localization';
import {texts} from '../localization';

export type TranslatedText = {
  locationTabTitle: string;
  favouritesTabTitle: string;
  temperature: string;
};

type LanguagesLabel = 'hu' | 'uk' | 'en';
export type LanguagesValue = 'hu' | 'uk' | 'en';

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
