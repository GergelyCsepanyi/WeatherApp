import LocalizedStrings from 'react-native-localization';

type TranslatedText = {
  locationTabTitle: string;
  favouritesTabTitle: string;
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

const hungarian = {
  locationTabTitle: 'HU Location',
  favouritesTabTitle: 'HU Favourites',
};

const ukrainian = {
  locationTabTitle: 'UK Location',
  favouritesTabTitle: 'UK Favourites',
};

const english = {
  locationTabTitle: 'Location',
  favouritesTabTitle: 'Favourites',
};

const string = new LocalizedStrings<TranslatedText>({
  hu: hungarian,
  uk: ukrainian,
  en: english,
});

// export const testTranslate = {
//   hu: hungarian,
//   uk: ukrainian,
//   en: english,
// };

export default string;
