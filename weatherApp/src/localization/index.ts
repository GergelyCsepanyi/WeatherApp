import {LanguagesValue, TranslatedText} from '../stores/LanguageStore';
import {english} from './en';
import {hungarian} from './hu';
import {ukrainian} from './uk';

type TextsType = {
  [key in LanguagesValue]: TranslatedText;
};

export const texts: TextsType = {
  hu: hungarian,
  uk: ukrainian,
  en: english,
};
