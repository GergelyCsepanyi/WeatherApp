import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {City} from '../stores/CityStore';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import CitiesStackScreen from '../screens/CitiesStackScreen';
import {useCityStore, useLanguageStore} from '../contexts/StoreContext';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import {Languages, languages} from '../localization';
import Dropdown from '../components/Dropdown';
import TabBarIcon from '../components/TabBarIcon';

export type RootTabParamList = {
  CityScreen: {city?: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

const NavigationComponentContainer = observer(() => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const languageStore = useLanguageStore();
  const cityStore = useCityStore();

  // const [lang, setLang] = useState<LanguagesValue>(
  //   languageStore.defaultLanguage,
  // );

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderLangChange = () => (
    <Dropdown
      data={languages}
      handleDropdownChange={handleLanguageChange}
      label="lang"
      value={languageStore.language}
    />
  );

  const handleLanguageChange = (langParam: Languages) => {
    languageStore.changeLanguage(langParam.value);
    //setLang(langParam.value);
  };

  useEffect(() => {
    cityStore.changeCurrentCity().then(() => setIsLoading(false));
  }, [cityStore, cityStore.currentPosition]);

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
          title: '',
        }}>
        <Tab.Screen
          name="CityScreen"
          options={{
            tabBarIcon: () => <TabBarIcon title="location" />,
          }}
          component={CityScreen}
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
            tabBarIcon: () => <TabBarIcon title="favourites" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
});

export default NavigationComponentContainer;
