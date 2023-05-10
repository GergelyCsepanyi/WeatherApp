import React, {useEffect, useState} from 'react';
import styles from './styles';
import {SafeAreaView, Text} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import {City} from '../../stores/CityStore';
import {Weather} from '../../stores/WeatherStore';
import {WeatherForecastResponse, weatherApi} from '../../services/WeatherAPI';
import {
  useCityStore,
  useLanguageStore,
  useWeatherStore,
} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';

type CityScreenProps = {
  city?: City;
};

const CityScreen = (props: CityScreenProps) => {
  const cityStore = useCityStore();
  const weatherStore = useWeatherStore();
  const languageStore = useLanguageStore();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentWeather, setCurrentWeather] = useState<Weather>();
  const [weatherForecast, setWeatherForecast] =
    useState<WeatherForecastResponse>();
  const [currentCity, setCurrentCity] = useState<City>();

  useEffect(() => {
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
  }, [cityStore.currentCity, props.city]);

  useEffect(() => {
    setIsLoading(true);

    if (!currentCity) {
      return;
    }

    const fetchWeather = async () => {
      try {
        const currentWeatherResponse = await weatherApi.fetchWeather(
          currentCity.longitude,
          currentCity.latitude,
          weatherStore.unitSystem,
          languageStore.language,
        );
        if (currentWeatherResponse === null) {
          return;
        }
        const weatherForecastResponse = await weatherApi.fetchWeatherForecast(
          currentCity.longitude,
          currentCity.latitude,
          languageStore.language,
        );
        if (weatherForecastResponse === null) {
          return;
        }
        setCurrentWeather(currentWeatherResponse);
        setWeatherForecast(weatherForecastResponse);
        setIsLoading(false);
      } catch (err) {
        console.log('Error during weather current/foreacast fetch', err);
      }
    };
    fetchWeather();
  }, [
    currentCity,
    weatherStore,
    languageStore.language,
    weatherStore.unitSystem,
  ]);

  useEffect(() => {
    weatherStore.setUnits(languageStore.language);
  }, [languageStore.language, weatherStore]);

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (isLoading || !currentCity || !currentWeather || !weatherForecast) {
    return <Text>Loading</Text>;
  }

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName={currentCity.name} />
      <DataSection weather={currentWeather} weatherForecast={weatherForecast} />
    </SafeAreaView>
  );
};

export default observer(CityScreen);
