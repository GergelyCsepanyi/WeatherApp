import LocalizedStrings from 'react-native-localization';

type TranslatedText = {
  locationTabTitle: string;
  favouritesTabTitle: string;
};

export type LanguagesValue = 'hu' | 'ua' | 'en';
type LanguagesLabel = 'hu' | 'ua' | 'en';

export type Languages = {
  label: LanguagesLabel;
  value: LanguagesValue;
};
export const languages: Languages[] = [
  {label: 'hu', value: 'hu'},
  {label: 'ua', value: 'ua'},
  {label: 'en', value: 'en'},
];

let string = new LocalizedStrings<TranslatedText>({
  hu: {locationTabTitle: 'lokacio', favouritesTabTitle: 'kedvenc'},
  ua: {locationTabTitle: 'lokacio ua', favouritesTabTitle: 'kedvenc ua'},
  en: {locationTabTitle: 'Location', favouritesTabTitle: 'Favourites'},
});

export default string;
