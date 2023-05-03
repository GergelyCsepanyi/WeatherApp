import React from 'react';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';

const cities = [
  {
    name: 'Szeged',
  },
  {
    name: 'Putnok',
  },
  {
    name: 'Miskolc',
  },
];

const FavouritesScreen = () => {
  return (
    <Swiper>
      {cities.map((city, i) => (
        <SafeAreaView key={i}>
          <Header cityName={city.name} />
          <DataSection />
        </SafeAreaView>
      ))}
    </Swiper>
  );
};

export default FavouritesScreen;
