import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import styles from './src/themes/styles/AppStyles';
import NavigationComponentContainer from './src/navigation/NavigationContainer';
import {RootStoreProvider} from './src/contexts/StoreContext';
import {observer} from 'mobx-react';

function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={styles.gestureHandlerRootView}>
        <RootStoreProvider>
          <NavigationComponentContainer />
        </RootStoreProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default observer(App);
