import React, {useEffect, useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import {City} from '../../stores/CityStore';
import {Weather} from '../../stores/WeatherStore';
import {
  WeatherLangs,
  WeatherUnits,
  weatherApi,
} from '../../services/WeatherAPI';
import {useCityStore, useWeatherStore} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../CitiesStackScreen';
import {RootTabParamList} from '../../navigation/NavigationContainer';

type CityScreenProps = {
  city?: City;
};

// type CityScreenProps = NativeStackScreenProps<RootTabParamList, 'CityScreen'>;

const CityScreen = (props: CityScreenProps) => {
  const cityStore = useCityStore();
  const weatherStore = useWeatherStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
    // setIsLoading(true);
    setError('');
    if (!cityStore.currentCity) {
      setError(`There is no cityStore.currentCity: ${cityStore.currentCity}`);
      return;
    }
    if (props.city) {
      setCurrentCity(props.city);
    } else {
      setCurrentCity(cityStore.currentCity);
    }
    // setIsLoading(false);
  }, [cityStore.currentCity, props.city]);

  useEffect(() => {
    if (!currentCity) {
      setIsLoading(true);
      return;
    }
    let result = weatherStore.getWeather(currentCity.name);
    // console.log('result:', result);
    if (result) {
      setIsLoading(false);
      setCurrentWeather(result);
      return;
    }

    weatherApi
      .fetchWeather(
        currentCity.longitude,
        currentCity.latitude,
        WeatherUnits.Celsius,
        WeatherLangs.EN,
      )
      .then(res => {
        if (res !== null) {
          // console.log('RES:', res);
          weatherStore.addWeather(res as Weather);
          setIsLoading(false);
          setCurrentWeather(res);
          // console.log('weathers:', weatherStore.weathers);
        }
      })
      .catch(err => console.log('ERR', err));
  }, [currentCity, weatherStore]);

  // useEffect(() => {
  //   if (!props.navigation) {
  //     return;
  //   }
  //   props.navigation.setOptions({title: 'asd'});
  // }, [props.navigation]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (isLoading || !currentWeather || !currentCity) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName={currentCity.name} />
      <DataSection weather={currentWeather} />
    </SafeAreaView>
  );
};

export default observer(CityScreen);
