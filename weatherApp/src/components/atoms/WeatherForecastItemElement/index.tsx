import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';
import styles from './styles';

type WeatherForecastItemElementProps = {
  icon: ReactElement<IconProps>;
  text: string;
};

const WeatherForecastItemElement = (
  params: WeatherForecastItemElementProps,
) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.iconContainer}>{params.icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{params.text}</Text>
      </View>
    </View>
  );
};

export default WeatherForecastItemElement;
