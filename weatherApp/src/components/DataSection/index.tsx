import React, {useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import DataElement from '../DataElement';
import {Stack} from 'react-native-spacing-system';
import DescriptionElement from '../DescriptionElement';
import {Weather} from '../../stores/WeatherStore';

type DataSectionProps = {
  weather: Weather;
};

const DataSection = (props: DataSectionProps) => {
  const {weather} = props;
  // const weatherStore = useWeatherStore();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setIsLoading(true);
    if (weather) {
      setIsLoading(false);
      // console.log('Weather:', weather);
    }
  }, [weather]);

  if (isLoading || !weather) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <ScrollView style={styles.containerStyle}>
        <Stack size={20} />
        <DataElement
          dataKey="Temperature"
          dataValue={weather.main.temp.toString()}
          // dataValue={'asd'}
          renderIcon={true}
        />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" renderIcon={true} />
        <Stack size={10} />
        <DescriptionElement description="Description (min & max temperature, weather conditions)" />
        <Stack size={10} />
        <DataElement dataKey="Sunset" dataValue="Time" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Sunrise" dataValue="Time" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Wind" dataValue="Details" renderIcon={true} />
      </ScrollView>
    </View>
  );
};

export default DataSection;
