import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import AddCityScreen from '../AddCityScreen';
import CitiesScreen from '../CitiesScreen';
import {observer} from 'mobx-react';

export type RootStackParamList = {
  CitiesScreen: undefined;
  AddCityScreen: undefined;
};

const CitiesStackScreen = () => {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitle: '',
      }}>
      <Stack.Screen name="CitiesScreen" component={CitiesScreen} />
      <Stack.Screen
        name="AddCityScreen"
        component={AddCityScreen}
        options={{presentation: 'modal'}}
      />
    </Stack.Navigator>
  );
};

export default observer(CitiesStackScreen);
