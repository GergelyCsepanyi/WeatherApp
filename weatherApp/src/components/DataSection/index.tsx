import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import DataElement from '../DataElement';
import {Stack} from 'react-native-spacing-system';
import DescriptionElement from '../DescriptionElement';
import {Weather} from '../../stores/WeatherStore';
import {observer} from 'mobx-react';
import {useLanguageStore, useWeatherStore} from '../../contexts/StoreContext';
import RenderFeatherIcon from '../atoms/RenderFeatherIcon';
import RenderCloudIcon from '../atoms/RenderCloudIcon';
import WeatherForecastItem from '../molecules/WeatherForecastItem';

type DataSectionProps = {
  weather: Weather;
};

const DataSection = (props: DataSectionProps) => {
  const {weather} = props;
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const languageStore = useLanguageStore();
  const weatherStore = useWeatherStore();

  const formatDistance = (distance: number): string => {
    if (distance > 1000) {
      return `${Math.round(distance / 1000)} km`;
    } else {
      return `${distance} m`;
    }
  };

  /**
   *
   * @param inputTime type number, in UTC
   * @returns
   */
  const formatTime = (inputTime: number): string => {
    const date = new Date(inputTime * 1000);

    var hours = date.getHours();

    switch (languageStore.language) {
      case 'en':
        break;
      case 'hu':
        hours++;
        break;
      case 'uk':
        hours += 2;
        break;
    }

    const minutes = '0' + date.getMinutes();

    const seconds = '0' + date.getSeconds();

    const time = `${hours}:${minutes.substr(-2)}:${seconds.substr(-2)}`;

    return time;
  };

  const formatWindSpeed = (windSpeed: number): string => {
    var output = '';
    switch (weatherStore.units) {
      case 'metric':
        //meter/sec
        const result = Math.round(windSpeed * 3.6);
        if (result < 1) {
          output = `<1 ${weatherStore.windSpeedUnit}`;
        } else {
          output = `${result} ${weatherStore.windSpeedUnit}`;
        }
        break;
      case 'imperial':
        // miles/hour
        output = `${Math.round(windSpeed)} ${weatherStore.windSpeedUnit}`;
        break;
    }
    return output;
  };

  const formatTemperature = (temp: number): string =>
    `${Math.round(temp)} ${weatherStore.weatherUnit}`;

  useEffect(() => {
    setIsLoading(true);
    if (weather) {
      setIsLoading(false);
    }
  }, [weather]);

  useEffect(() => {}, [languageStore.language]);

  if (isLoading || !weather) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <ScrollView style={styles.containerStyle}>
        <Stack size={10} />
        <DataElement
          dataKey={languageStore.string.temperature}
          dataValue={formatTemperature(weather.main.temp)}
          icon={RenderFeatherIcon({name: 'thermometer'})}
        />

        {weather.rain?.['1h'] ? (
          <>
            <DataElement
              dataKey={weather.rain['1h'].toString()}
              dataValue="temperature"
            />
          </>
        ) : null}

        {weather.snow?.['3h'] ? (
          <>
            <DataElement
              dataKey={weather.snow['3h'].toString()}
              dataValue="temperature"
            />
          </>
        ) : null}

        <DataElement
          dataKey={languageStore.string.clouds}
          dataValue={`${weather.clouds.all.toString()} %`}
          icon={RenderCloudIcon({})}
        />

        <DataElement
          dataKey={languageStore.string.humidity}
          dataValue={`${weather.main.humidity.toString()} %`}
          icon={RenderFeatherIcon({name: 'droplet'})}
        />

        <DataElement
          dataKey={languageStore.string.visibility}
          dataValue={formatDistance(weather.visibility)}
          icon={RenderFeatherIcon({name: 'eye'})}
        />

        <DescriptionElement
          title={languageStore.string.today}
          descriptions={[
            `${languageStore.string.mainWeatherCondition}: ${weather.weather[0].description}`,
            `${languageStore.string.minTemperature}: ${formatTemperature(
              weather.main.temp_min,
            )}`,
            `${languageStore.string.maxTemperature}: ${formatTemperature(
              weather.main.temp_max,
            )}`,
          ]}
        />

        <DataElement
          dataKey={languageStore.string.sunrise}
          dataValue={formatTime(weather.sys.sunrise)}
          icon={RenderFeatherIcon({name: 'sunrise'})}
        />

        <DataElement
          dataKey={languageStore.string.sunset}
          dataValue={formatTime(weather.sys.sunset)}
          icon={RenderFeatherIcon({name: 'sunset'})}
        />

        <DataElement
          dataKey={languageStore.string.wind}
          dataValue={formatWindSpeed(weather.wind.speed)}
          icon={RenderFeatherIcon({
            name: 'arrow-up',
            iconRotateDeg: weather.wind.deg,
          })}
        />

        <WeatherForecastItem />
      </ScrollView>
    </View>
  );
};

export default observer(DataSection);
