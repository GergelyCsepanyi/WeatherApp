import React from 'react';
import {SafeAreaView} from 'react-native';
import Header from '../../components/Header';
import DataSection from '../../components/DataSection';
import styles from './styles';

const MainScreen = () => {
  return (
    <SafeAreaView style={styles.containerStyle}>
      <Header cityName="Budapest" />
      <DataSection />
    </SafeAreaView>
  );
};

export default MainScreen;
