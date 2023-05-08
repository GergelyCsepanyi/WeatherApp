import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {City} from '../stores/CityStore';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import CitiesStackScreen from '../screens/CitiesStackScreen';
import {useCityStore, useLanguageStore} from '../contexts/StoreContext';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import string, {Languages, languages} from '../localization';
import Dropdown from '../components/Dropdown';
import {autorun, isObservable, reaction, toJS, when} from 'mobx';

export type RootTabParamList = {
  CityScreen: {item: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

const NavigationComponentContainer = observer(() => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const languageStore = useLanguageStore();
  const cityStore = useCityStore();

  const lang = toJS(languageStore.language);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderFilledFavouriteIcon = () => (
    <MaterialIcon name="favorite" size={30} color="black" />
  );
  const renderLocationIcon = () => (
    <MaterialIcon name="room" size={30} color="black" />
  );
  const renderLangChange = () => (
    <Dropdown
      data={languages}
      handleDropdownChange={handleLanguageChange}
      label="lang"
      value={lang}
    />
  );

  const handleLanguageChange = (langParam: Languages) => {
    languageStore.changeLanguage(langParam.value);
    //setLang(langParam.value);
  };

  useEffect(() => {
    // TODO: not working, useEffect won't be triggered
    cityStore.changeCurrentCity().then(() => setIsLoading(false));
  }, [cityStore, cityStore.currentPosition]);

  useEffect(() => {
    console.log('THE STORE lang has changed');
  }, [lang]);

  useEffect(() =>
    autorun(() => {
      if (languageStore.getLanguage()) {
        console.log('CHANGED');
        console.log(isObservable(languageStore));
      }
    }),
  );

  autorun(() => {
    if (languageStore.language) {
      console.log('CHANGED 2');
      console.log(isObservable(languageStore));
    }
  });

  useEffect(() => {
    const disposer = autorun(() => {
      console.log('CHANGED 3');
    });

    when(
      () => languageStore.language,
      () => disposer(),
    );

    return () => disposer();
  }, [languageStore.language]);

  // when(
  //   () => languageStore.language === 'uk',
  //   () => console.log('set to UK'),
  // );
  // useEffect(() => {
  //   console.log('THE useState lang has changed');
  // }, [lang]);

  useEffect(() => {
    const reactionDisposer = reaction(
      () => languageStore.language,
      language => console.log(`languageStore.language is now ${language}`),
    );

    return () => {
      reactionDisposer();
    };
  }, [languageStore.language]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: '',
          headerLeft: renderLangChange,
        }}>
        <Tab.Screen
          name="CityScreen"
          options={{
            title: string.locationTabTitle,
            // title: testTranslate[lang].locationTabTitle,
            tabBarIcon: renderLocationIcon,
          }}
          children={() => <CityScreen city={cityStore.currentCity as City} />}
          // children={() => renderLangChange()}
        />
        <Tab.Screen
          name={
            cityStore.cities.length === 0
              ? 'AddCityScreen'
              : 'CitiesStackScreen'
          }
          component={
            cityStore.cities.length === 0 ? AddCityScreen : CitiesStackScreen
          }
          options={{
            title: string.favouritesTabTitle,
            // title: testTranslate[languageStore.language].favouritesTabTitle,
            tabBarIcon: renderFilledFavouriteIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
});

export default NavigationComponentContainer;
