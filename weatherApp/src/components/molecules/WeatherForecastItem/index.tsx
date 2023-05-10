import React from 'react';
import {Text, View} from 'react-native';
import WeatherForecastItemElement from '../../atoms/WeatherForecastItemElement';
import RenderFeatherIcon from '../../atoms/RenderFeatherIcon';
import styles from './styles';

const WeatherForecastItem = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.dayTextContainer}>
        <Text style={styles.dayText}>Day</Text>
      </View>
      <View style={styles.dataContainer}>
        <WeatherForecastItemElement
          icon={RenderFeatherIcon({
            name: 'arrow-up',
            iconRotateDeg: 100,
          })}
          text="wind"
        />
        <WeatherForecastItemElement
          icon={RenderFeatherIcon({
            name: 'arrow-up',
            iconRotateDeg: 200,
          })}
          text="wind"
        />
      </View>
    </View>
  );
};

export default WeatherForecastItem;
