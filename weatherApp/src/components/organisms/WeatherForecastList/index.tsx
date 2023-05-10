import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {WeatherForecastDailyWeatherType} from '../../../services/WeatherAPI';
import WeatherForecastItem from '../../molecules/WeatherForecastItem';
import {useLanguageStore} from '../../../contexts/StoreContext';
import HorizontalListSeparator from '../../atoms/HorizontalListSeparator';
import styles from './styles';

type WeatherForecastListProps = {
  data: WeatherForecastDailyWeatherType[];
};

const WeatherForecastList = (props: WeatherForecastListProps) => {
  const languageStore = useLanguageStore();
  const [, ...forecasts] = props.data;

  return (
    <View>
      <View style={styles.titleTextContainer}>
        <Text style={styles.titleText}>{languageStore.string.forecast}</Text>
      </View>
      <FlatList
        data={forecasts}
        keyExtractor={item => item.date_epoch.toString()}
        renderItem={({item, index}) => (
          <WeatherForecastItem key={index} item={item} />
        )}
        horizontal
        ItemSeparatorComponent={HorizontalListSeparator}
      />
    </View>
  );
};

export default WeatherForecastList;
