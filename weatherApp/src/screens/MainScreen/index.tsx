import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';

const MainScreen = () => {
  return (
    <SafeAreaView>
      <Header cityName="Budapest" />
      <DataSection />
    </SafeAreaView>
  );
};

export default MainScreen;
