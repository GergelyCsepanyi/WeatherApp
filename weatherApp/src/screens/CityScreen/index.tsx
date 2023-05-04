import React from 'react';
import styles from './styles';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import {City} from '../../store';

type CityScreenProps = {
  city: City;
};

const CityScreen = (props: CityScreenProps) => {
  const {city} = props;

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName={city.name} />
      <DataSection />
    </SafeAreaView>
  );
};

export default CityScreen;
