import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './styles';
import {Stack} from 'react-native-spacing-system';

type HeaderProps = {cityName: string};

const Header = (props: HeaderProps) => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Stack size={30} />
      <Text style={styles.cityTextStyle}>{props.cityName}</Text>
      <Stack size={20} />
      <Text style={styles.conditionsTextStyle}>Weather Conditions</Text>
      <Stack size={10} />
      <Text style={styles.temperatureTextStyle}>Temperature</Text>
    </SafeAreaView>
  );
};

export default Header;
