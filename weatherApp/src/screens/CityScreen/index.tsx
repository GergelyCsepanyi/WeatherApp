import React, {useEffect, useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import {City} from '../../store/city';
import weatherStore, {Weather} from '../../store/weather';
import {
  WeatherLangs,
  WeatherUnits,
  weatherApi,
} from '../../services/WeatherAPI';
import {observer} from 'mobx-react';

type CityScreenProps = {
  city: City;
};

const CityScreen = (props: CityScreenProps) => {
  const {city} = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!city) {
      return;
    }
    let result = weatherStore.getCurrentWeather(city.id);
    console.log('result:', result);
    if (result) {
      setIsLoading(false);
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
        weatherStore.addWeather(res as Weather);
        setIsLoading(false);
        console.log('weathers:', weatherStore.weathers);
      })
      .catch(err => console.log('ERR', err));
  }, [city, weatherStore.weathers]);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName={city.name} />
      <DataSection weather={weatherStore.getCurrentWeather(city.id)} />
    </SafeAreaView>
  );
};

export default observer(CityScreen);
