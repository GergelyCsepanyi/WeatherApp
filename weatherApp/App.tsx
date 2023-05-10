import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import NavigationComponentContainer from './src/navigation/NavigationContainer';
import {RootStoreProvider} from './src/contexts/StoreContext';
import {observer} from 'mobx-react';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <RootStoreProvider>
        <NavigationComponentContainer />
      </RootStoreProvider>
    </SafeAreaProvider>
  );
}

export default observer(App);
