import React, {useEffect} from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {useLanguageStore} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';
import {Text} from 'react-native';

type TabBarItemProps = {
  title: 'location' | 'favourites';
  focused: boolean;
};

const TabBarIcon = ({focused, title}: TabBarItemProps) => {
  const languageStore = useLanguageStore();

  useEffect(() => {}, [languageStore.language]);

  useEffect(() => {
    console.log(focused);
    if (focused) {
      console.log('Focus on:', title);
    }
  }, [focused, title]);

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
