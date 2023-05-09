import React from 'react';
import {useLanguageStore} from '../../contexts/StoreContext';
// import {Languages, languages} from '../../localization';
import {observer} from 'mobx-react';
import Dropdown from '../Dropdown';
import {Languages, languages} from '../../stores/LanguageStore';

const LanguageSelection = () => {
  const languageStore = useLanguageStore();

  const handleLanguageChange = (langParam: Languages) => {
    languageStore.changeLanguage(langParam.value);
  };

  return (
    <Dropdown
      data={languages}
      handleDropdownChange={handleLanguageChange}
      label="lang"
      value={languageStore.language}
    />
  );
};

export default observer(LanguageSelection);
