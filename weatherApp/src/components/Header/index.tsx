import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import styles from './styles';
import {Stack} from 'react-native-spacing-system';
import {useLanguageStore} from '../../contexts/StoreContext';

type HeaderProps = {cityName: string};

const Header = (props: HeaderProps) => {
  const languageStore = useLanguageStore();

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Stack size={10} />
      <Text style={styles.cityTextStyle}>{props.cityName}</Text>
      <Stack size={20} />
      <Text style={styles.conditionsTextStyle}>
        {languageStore.string.mainWeatherCondition}
      </Text>
      <Stack size={10} />
      <Text style={styles.temperatureTextStyle}>
        {languageStore.string.temperature}
      </Text>
    </SafeAreaView>
  );
};

export default Header;
