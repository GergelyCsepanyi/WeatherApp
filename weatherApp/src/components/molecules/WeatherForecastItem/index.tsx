import React from 'react';
import {Text, View} from 'react-native';
import WeatherForecastItemElement from '../../atoms/WeatherForecastItemElement';
import RenderFeatherIcon from '../../atoms/RenderFeatherIcon';
import styles from './styles';
import {WeatherForecastDailyWeatherType} from '../../../services/WeatherAPI';
import {LanguageStore} from '../../../stores/LanguageStore';
import {
  useLanguageStore,
  useWeatherStore,
} from '../../../contexts/StoreContext';

const getDay = (dateString: string, languageStore: LanguageStore): string => {
  const date = new Date(dateString);
  const dayIndex = date.getDay();
  var dayString = '';

  switch (dayIndex) {
    case 0:
      dayString = languageStore.string.sunday;
      break;
    case 1:
      dayString = languageStore.string.monday;
      break;
    case 2:
      dayString = languageStore.string.tuesday;
      break;
    case 3:
      dayString = languageStore.string.wednesday;
      break;
    case 4:
      dayString = languageStore.string.thursday;
      break;
    case 5:
      dayString = languageStore.string.friday;
      break;
    case 6:
      dayString = languageStore.string.saturday;
      break;
  }

  return dayString;
};

type WeatherForecastItemProp = {
  item: WeatherForecastDailyWeatherType;
};

const WeatherForecastItem = ({item}: WeatherForecastItemProp) => {
  const languageStore = useLanguageStore();
  const weatherStore = useWeatherStore();

  const temperatureText =
    (weatherStore.unitSystem === 'metric'
      ? `${Math.round(item.day.mintemp_c)}/${Math.round(item.day.maxtemp_c)} `
      : `${Math.round(item.day.mintemp_f)}/${Math.round(
          item.day.maxtemp_f,
        )} `) + weatherStore.weatherUnit;

  const windText =
    (weatherStore.unitSystem === 'metric'
      ? `${Math.round(item.day.maxwind_kph)} `
      : `${Math.round(item.day.maxwind_mph)} `) + weatherStore.windSpeedUnit;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dayTextContainer}>
        <Text style={styles.dayText}>{getDay(item.date, languageStore)}</Text>
      </View>
      <View style={styles.dataContainer}>
        <WeatherForecastItemElement
          icon={RenderFeatherIcon({
            name: 'thermometer',
          })}
          text={temperatureText}
        />

        <WeatherForecastItemElement
          icon={RenderFeatherIcon({
            name: 'wind',
          })}
          text={windText}
        />

        {item.day.daily_chance_of_rain > 0 ? (
          <WeatherForecastItemElement
            icon={RenderFeatherIcon({
              name: 'cloud-rain',
            })}
            text={`${item.day.daily_chance_of_rain.toString()} %`}
          />
        ) : null}

        {item.day.daily_chance_of_snow > 0 ? (
          <WeatherForecastItemElement
            icon={RenderFeatherIcon({
              name: 'cloud-snow',
            })}
            text={`${item.day.daily_chance_of_snow.toString()} %`}
          />
        ) : null}
      </View>
    </View>
  );
};

export default WeatherForecastItem;
