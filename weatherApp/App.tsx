import React from 'react';
import {SafeAreaView} from 'react-native';
import {API_GEODB_CITIES_TOKEN} from '@env';
import MainScreen from './src/screens/MainScreen';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <MainScreen />
    </SafeAreaView>
  );
}

export default App;
