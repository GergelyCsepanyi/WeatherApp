import React from 'react';
import {Image, SafeAreaView} from 'react-native';
import {API_GEODB_CITIES_TOKEN} from '@env';
import MainScreen from './src/screens/MainScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FavouritesScreen from './src/screens/FavouritesScreen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import IconButton from './src/components/IconButton';

export type RootTabParamList = {
  MainScreen: undefined;
  FavouritesScreen: undefined;
};

function App(): JSX.Element {
  const Tab = createBottomTabNavigator<RootTabParamList>();

  const renderAddCityIcon = () => (
    <IconButton
      icon={<MaterialIcon name="queue" size={30} color="black" />}
      onPress={() => console.log('PRESS')}
    />
  );
  const renderLocationIcon = () => (
    <MaterialIcon name="room" size={30} color="black" />
  );
  const renderFilledFavouriteIcon = () => (
    <MaterialIcon name="favorite" size={30} color="black" />
  );

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: true,
          headerTitle: '',
        }}>
        <Tab.Screen
          name="MainScreen"
          component={MainScreen}
          options={{
            title: 'Location',
            tabBarIcon: renderLocationIcon,
          }}
        />
        <Tab.Screen
          name="FavouritesScreen"
          component={FavouritesScreen}
          options={{
            title: 'Favourites',
            tabBarIcon: renderFilledFavouriteIcon,
            headerRight: renderAddCityIcon,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
