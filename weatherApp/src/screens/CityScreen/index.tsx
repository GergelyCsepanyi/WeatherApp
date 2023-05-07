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
import {useWeatherStore} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';

type CityScreenProps = {
  city: City;
};

const CityScreen = (props: CityScreenProps) => {
  const {city} = props;
  const weatherStore = useWeatherStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<Weather>();

  useEffect(() => {
    setIsLoading(true);
    if (!city) {
      setError(`There is no city param: ${city}`);
      return;
    }
    let result = weatherStore.getWeather(city.name);
    console.log('result:', result);
    if (result) {
      setIsLoading(false);
      setCurrentWeather(result);
      return;
    }
    console.log('HERE');
    weatherApi
      .fetchWeather(
        city.longitude,
        city.latitude,
        WeatherUnits.Celsius,
        WeatherLangs.EN,
      )
      .then(res => {
        if (res !== null) {
          console.log('RES:', res);
          weatherStore.addWeather(res as Weather);
          setIsLoading(false);
          setCurrentWeather(res);
          console.log('weathers:', weatherStore.weathers);
        }
      })
      .catch(err => console.log('ERR', err));
  }, [city, weatherStore]);

  if (isLoading || !currentWeather) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName={city.name} />
      <DataSection weather={currentWeather} />
    </SafeAreaView>
  );
};

export default observer(CityScreen);
