import React, {useEffect, useState} from 'react';
import {API_GEODB_CITIES_TOKEN} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CitiesStackScreen from './src/screens/CitiesStackScreen';
import store, {City} from './src/store';
import CityScreen from './src/screens/CityScreen';
import AddCityScreen from './src/screens/AddCityScreen';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './src/themes/styles/AppStyles';
import {
  WeatherLangs,
  WeatherResponse,
  WeatherUnits,
  weatherApi,
} from './src/services/WeatherAPI';
import {observable} from 'mobx';

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

  const [currentCityWeather, setCurrentCityWeather] =
    useState<WeatherResponse>();

  useEffect(() => {
    // make a gps fetch and set the data to store.currentCity
  }, []);

  useEffect(() => {
    const city = store.currentCity;
    weatherApi
      .fetchWeather(
        city.longitude,
        city.latitude,
        WeatherUnits.Celsuis,
        WeatherLangs.EN,
      )
      .then(data => console.log('Weather:', data));
  }, [store.currentCity]);

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
              //component={CityScreen}
              options={{
                title: 'Location',
                tabBarIcon: renderLocationIcon,
              }}
              children={() => CityScreen({city: {id: '222', name: 'Budapest'}})}
              //initialParams={{item: {id: '222', name: 'Budapest'}}}
            />
            <Tab.Screen
              name={
                store.cities.length === 0
                  ? 'AddCityScreen'
                  : 'CitiesStackScreen'
              }
              component={
                store.cities.length === 0 ? AddCityScreen : CitiesStackScreen
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

export default App;
