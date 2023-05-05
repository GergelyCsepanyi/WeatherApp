import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CitiesStackScreen from './src/screens/CitiesStackScreen';
import cityStore, {City} from './src/store/city';
import CityScreen from './src/screens/CityScreen';
import AddCityScreen from './src/screens/AddCityScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './src/themes/styles/AppStyles';
import Geolocation from '@react-native-community/geolocation';
import {citiesApi} from './src/services/CitiesAPI';
import {observer} from 'mobx-react';

export type RootTabParamList = {
  CityScreen: {item: City};
  CitiesStackScreen: undefined;
  AddCityScreen: undefined;
};

function App(): JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

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
          }
          // else {
          //   setCurrentCity(cityStore.defaultCity);
          // }
        });
    }
  }, [currentPosition]);

  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
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
              children={() => (
                <CityScreen city={cityStore.currentCity as City} />
              )}
              //initialParams={{item: {id: '222', name: 'Budapest'}}}
            />
            <Tab.Screen
              name={
                cityStore.cities.length === 0
                  ? 'AddCityScreen'
                  : 'CitiesStackScreen'
              }
              component={
                cityStore.cities.length === 0
                  ? AddCityScreen
                  : CitiesStackScreen
              }
              options={{
                title: 'Favourites',
                tabBarIcon: renderFilledFavouriteIcon,
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default observer(App);
