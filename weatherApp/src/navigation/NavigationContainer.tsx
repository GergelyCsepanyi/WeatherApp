import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {City} from '../stores/CityStore';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import CitiesStackScreen from '../screens/CitiesStackScreen';
import {useCityStore} from '../contexts/StoreContext';
import {Text} from 'react-native';
import {observer} from 'mobx-react';
import TabBarIcon from '../components/TabBarIcon';
import LanguageSelection from '../components/LanguageSelection';

export type RootTabParamList = {
  CityScreen: {city?: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

const NavigationComponentContainer = observer(() => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const cityStore = useCityStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
          title: '',
        }}>
        <Tab.Screen
          name="CityScreen"
          options={{
            headerLeft: () => <LanguageSelection />,
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
