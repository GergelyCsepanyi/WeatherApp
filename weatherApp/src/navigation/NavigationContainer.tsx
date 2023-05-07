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

export type RootTabParamList = {
  CityScreen: {item: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

const NavigationComponentContainer = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const languageStore = useLanguageStore();
  const cityStore = useCityStore();

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
      value={languageStore.language}
    />
  );

  const handleLanguageChange = (lang: Languages) => {
    languageStore.changeLanguage(lang.value);
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
        }}>
        <Tab.Screen
          name="CityScreen"
          options={{
            title: string.locationTabTitle,
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
            tabBarIcon: renderFilledFavouriteIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default observer(NavigationComponentContainer);
