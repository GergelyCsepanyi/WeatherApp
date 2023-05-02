import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {API_GEODB_CITIES_TOKEN} from '@env';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>{API_GEODB_CITIES_TOKEN}</Text>
    </SafeAreaView>
  );
}

export default App;
