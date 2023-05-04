import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import SearchBar from '../../components/Searchbar';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';
import {FlatList} from 'react-native-gesture-handler';
import {CityResponse, citiesApi} from '../../services/CitiesAPI';

type AddCityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddCityScreen'
>;

const AddCityScreen = (props: AddCityScreenProps) => {
  const [searchCity, setSearchCity] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [foundCities, setFoundCities] = useState<CityResponse[]>([]);

  const handleClose = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

  // useEffect(() => {
  //   console.log(foundCities);
  // }, [foundCities]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        RenderIconButton({
          name: 'close',
          size: 30,
          color: 'black',
          onPress: handleClose,
        }),
    });
  }, [props.navigation, handleClose]);

  useEffect(() => {
    if (searchCity) {
      citiesApi.fetchCities(searchCity).then(result => {
        if (!result) {
          return;
        }
        setFoundCities(result);
      });
    }
  }, [searchCity]);

  return (
    <SafeAreaView style={styles.containerStyle}>
      <SearchBar
        onCancel={() => setFoundCities([])}
        onChangeText={setSearchCity}
        onClear={() => console.log('Search cleared')}
        //onEndEditing={}
        onTouchStart={() => console.log('Search started')}
        setIsSearchBarFocused={setIsSearchBarFocused}
        placeholder="Search City"
        value={searchCity}
      />
      <Text>
        {isSearchBarFocused ? (
          <FlatList
            data={foundCities}
            ListHeaderComponent={
              <View>
                <Text>{foundCities?.length > 0 ? 'Found Cities:' : null}</Text>
              </View>
            }
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => console.log('Pressed city: ', item)}>
                <Text>{`${item.name}, ${item.country}`}</Text>
              </TouchableOpacity>
            )}
          />
        ) : (
          'NOT focused'
        )}
      </Text>
      {/* if not focused -> render favourite cities 
          else -> hide fav. cities */}
    </SafeAreaView>
  );
};

export default AddCityScreen;
