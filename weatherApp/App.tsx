import React from 'react';
import {API_GEODB_CITIES_TOKEN} from '@env';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CitiesStackScreen from './src/screens/CitiesStackScreen';
import {City} from './src/store';
import CityScreen from './src/screens/CityScreen';

export type RootTabParamList = {
  CityScreen: {item: City};
  CitiesStackScreen: undefined;
};

function App(): JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const renderFilledFavouriteIcon = () => (
    <MaterialIcon name="favorite" size={30} color="black" />
  );
  const renderLocationIcon = () => (
    <MaterialIcon name="room" size={30} color="black" />
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: true,
            headerTitle: '',
          }}>
          <Tab.Screen
            name="CityScreen"
            //component={CityScreen}
            options={{
              title: 'Location',
              tabBarIcon: renderLocationIcon,
            }}
            children={() => CityScreen({city: {id: '222', name: 'Budapest'}})}
            //initialParams={{item: {id: '222', name: 'Budapest'}}}
          />
          <Tab.Screen
            name="CitiesStackScreen"
            component={CitiesStackScreen}
            options={{
              title: 'Favourites',
              tabBarIcon: renderFilledFavouriteIcon,
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
