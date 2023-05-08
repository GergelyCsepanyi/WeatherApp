import React, {useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useLanguageStore} from '../../contexts/StoreContext';
// import string from '../../localization';
import {observer} from 'mobx-react';
import {Text} from 'react-native';

type TabBarItemProps = {
  title: 'location' | 'favourites';
};

const TabBarIcon = (props: TabBarItemProps) => {
  const {title} = props;

  const languageStore = useLanguageStore();

  useEffect(() => {}, [languageStore.language]);

  return (
    <>
      <MaterialIcon
        name={title === 'favourites' ? 'favorite' : 'room'}
        size={30}
        color="black"
      />
      <Text>
        {title === 'favourites'
          ? languageStore.string.favouritesTabTitle
          : languageStore.string.locationTabTitle}
      </Text>
    </>
  );
};

export default observer(TabBarIcon);
