import {makeAutoObservable} from 'mobx';
import string, {LanguagesValue} from '../localization';

export class LanguageStore {
  language: LanguagesValue;
  defaultLanguage: LanguagesValue = 'hu';

  constructor() {
    makeAutoObservable(this);
    this.changeLanguage(this.defaultLanguage);
  }

  changeLanguage(language: LanguagesValue) {
    console.log('change language to:', language);
    string.setLanguage(language);
    this.language = language;
    console.log('store lang changed to:', this.language);
    console.log('interface lang :', string.getInterfaceLanguage());
    // console.log('string value:', string);
  }

  getLanguage() {
    return `${this.language}`;
  }
}
