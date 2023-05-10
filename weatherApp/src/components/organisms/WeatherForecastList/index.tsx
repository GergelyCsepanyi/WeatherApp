import React from 'react';
import {Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {WeatherForecastDailyWeatherType} from '../../../services/WeatherAPI';
import WeatherForecastItem from '../../molecules/WeatherForecastItem';
import {useLanguageStore} from '../../../contexts/StoreContext';
import HorizontalListSeparator from '../../atoms/HorizontalListSeparator';

type WeatherForecastListProps = {
  data: WeatherForecastDailyWeatherType[];
};

const WeatherForecastList = (props: WeatherForecastListProps) => {
  const languageStore = useLanguageStore();

  console.log('DAYS number:', props.data.length);

  return (
    <View>
      <Text>{languageStore.string.forecast}</Text>
      <FlatList
        data={[...props.data, ...props.data]}
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
