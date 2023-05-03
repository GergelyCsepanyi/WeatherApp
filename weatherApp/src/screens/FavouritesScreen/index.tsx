import React from 'react';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootTabParamList} from '../../../App';

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

type FavouritesScreenProps = NativeStackScreenProps<
  RootTabParamList,
  'FavouritesScreen'
>;

const FavouritesScreen = (props: FavouritesScreenProps) => {
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
