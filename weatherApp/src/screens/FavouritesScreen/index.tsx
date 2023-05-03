import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {RootTabParamList} from '../../../App';
import styles from './styles';
import MainScreen from '../MainScreen';
import {Button, View} from 'react-native';
import Swiper from 'react-native-swiper';

const cities = [
  {
    name: 'Szeged',
  },
  {
    name: 'Putnok',
  },
  {
    name: 'Miskolc',
  },
];

type FavouritesScreenProps = NativeStackScreenProps<
  RootTabParamList,
  'FavouritesScreen'
>;

export type RootStackParamList = {
  FavouritesScreen: undefined;
  AddCityModal: undefined;
};

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Go to Profile"
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
}

const FavouritesScreen = (props: FavouritesScreenProps) => {
  const Stack = createStackNavigator();

  return (
    <Swiper>
      <Stack.Navigator>
        <Stack.Screen name={'asd'} component={MainScreen} />
        <Stack.Screen name={'asd2'} component={MainScreen} />
      </Stack.Navigator>
    </Swiper>
  );
};

// cities.map((city, index) => (
//   <Swiper>
//     <SafeAreaView key={index} style={styles.containerStyle}>
//       <Header cityName={city.name} />
//       <DataSection />
//     </SafeAreaView>
//   </Swiper>
// ));

export default FavouritesScreen;
