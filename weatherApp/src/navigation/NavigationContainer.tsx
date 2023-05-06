import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {City} from '../stores/CityStore';
import CityScreen from '../screens/CityScreen';
import AddCityScreen from '../screens/AddCityScreen';
import CitiesStackScreen from '../screens/CitiesStackScreen';
import Geolocation from '@react-native-community/geolocation';
import {citiesApi} from '../services/CitiesAPI';
import {useCityStore} from '../contexts/StoreContext';
import {Text} from 'react-native';

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

  const [currentPosition, setCurrentPosition] = useState<{
    latitude: number;
    longitude: number;
  }>();

  //const [currentCity, setCurrentCity] = useState<City>(cityStore.defaultCity);

  useEffect(() => {
    Geolocation.getCurrentPosition(info =>
      setCurrentPosition({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude,
      }),
    );
  }, []);

  useEffect(() => {
    if (currentPosition?.latitude && currentPosition?.longitude) {
      setIsLoading(true);
      citiesApi
        .fetchCitiesByLocation(
          currentPosition.latitude,
          currentPosition.longitude,
        )
        .then(res => {
          if (res && res.length > 0) {
            //setCurrentCity(res[0]);
            cityStore.currentCity = res[0];
            console.log('currentCity', cityStore.currentCity.city);
            setIsLoading(false);
          }
          // else {
          //   setCurrentCity(cityStore.defaultCity);
          // }
        });
    }
  }, [currentPosition, cityStore]);

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

export default NavigationComponentContainer;
