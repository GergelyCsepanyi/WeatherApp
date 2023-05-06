import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {City} from '../stores/CityStore';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import CitiesStackScreen from '../screens/CitiesStackScreen';
import {useCityStore} from '../contexts/StoreContext';
import {Text} from 'react-native';
import {observer} from 'mobx-react';

export type RootTabParamList = {
  CityScreen: {item: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

const NavigationComponentContainer = () => {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const cityStore = useCityStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const renderFilledFavouriteIcon = () => (
    <MaterialIcon name="favorite" size={30} color="black" />
  );
  const renderLocationIcon = () => (
    <MaterialIcon name="room" size={30} color="black" />
  );

  useEffect(() => {
    if (
      cityStore.currentPosition?.latitude &&
      cityStore.currentPosition?.longitude
    ) {
      cityStore.changeCurrentCity().then(() => setIsLoading(false));
    }
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
        }}>
        <Tab.Screen
          name="CityScreen"
          options={{
            title: 'Location',
            tabBarIcon: renderLocationIcon,
          }}
          children={() => <CityScreen city={cityStore.currentCity as City} />}
          //initialParams={{item: {id: '222', name: 'Budapest'}}}
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
            title: 'Favourites',
            tabBarIcon: renderFilledFavouriteIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default observer(NavigationComponentContainer);
