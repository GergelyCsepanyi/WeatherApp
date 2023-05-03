import React from 'react';
import {SafeAreaView} from 'react-native';
import {API_GEODB_CITIES_TOKEN} from '@env';
import MainScreen from './src/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export type RootTabParamList = {
  MainScreen: undefined;
  FavouritesScreen: undefined;
};

function App(): JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{headerShown: false}}>
        <Tab.Screen
          name="MainScreen"
          component={MainScreen}
          options={{title: 'Location'}}
        />
        <Tab.Screen
          name="FavouritesScreen"
          component={MainScreen}
          options={{title: 'Favourites'}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
