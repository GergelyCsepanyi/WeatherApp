import React, {useEffect} from 'react';
import {ScrollView, Text, View} from 'react-native';
import styles from './styles';
import DataElement from '../DataElement';
import {Stack} from 'react-native-spacing-system';
import DescriptionElement from '../DescriptionElement';
import weatherStore, {Weather} from '../../store/weather';
import {observer} from 'mobx-react';

type DataSectionProps = {
  weather: Weather;
};

const DataSection = (props: DataSectionProps) => {
  const {weather} = props;
  //const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    weatherStore.setIsLoading(true);
    if (weather) {
      weatherStore.setIsLoading(false);
      console.log('Weather:', weather);
    }
  }, [weather]);

  if (weatherStore.isLoading || !weather) {
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

export default observer(DataSection);
