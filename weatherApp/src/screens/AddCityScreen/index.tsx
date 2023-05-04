import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import SearchBar from '../../components/Searchbar';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';
import {FlatList} from 'react-native-gesture-handler';
import {CityResponse, citiesApi} from '../../services/CitiesAPI';
import store, {City} from '../../store';
import DraggableFlatList, {
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {toJS} from 'mobx';

type AddCityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddCityScreen'
>;

const AddCityScreen = (props: AddCityScreenProps) => {
  const [searchbarCityValue, setSearchbarCityValue] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [foundCities, setFoundCities] = useState<CityResponse[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityResponse | null>(null);
  const [favouriteCitiesList, setFavouriteCitiesList] = useState<City[]>(
    toJS(store.cities),
  );

  const handleClose = useCallback(() => {
    props.navigation.goBack();
  }, [props.navigation]);

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
    if (searchbarCityValue) {
      citiesApi.fetchCities(searchbarCityValue).then(result => {
        if (!result) {
          return;
        }
        setFoundCities(result);
      });
    }
  }, [searchbarCityValue]);

  const handleSearchStarted = () => {
    setSelectedCity(null);
  };

  const handleCitySelection = (city: CityResponse) => {
    setSelectedCity(city);
    store.addCity(city);
    setFavouriteCitiesList(toJS(store.cities));
    setFoundCities([]);
    setSearchbarCityValue('');
  };

  const renderFlatListEmptyItem = () => {
    return (
      <View>
        <Text>No data found!</Text>
      </View>
    );
  };

  const renderFoundCitiesHeader = () => {
    return (
      <View>
        <Text>{foundCities?.length > 0 ? 'Found Cities:' : null}</Text>
      </View>
    );
  };
  const renderFoundCitiesItem = (item: CityResponse) => {
    return (
      <TouchableOpacity onPress={() => handleCitySelection(item)}>
        <Text>{`${item.name}, ${item.country}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderFavouriteCitiesHeader = () => {
    return (
      <View>
        <Text>{store.cities?.length > 0 ? 'Favourite Cities:' : null}</Text>
      </View>
    );
  };
  const renderFavouriteCitiesItem = ({item, drag, isActive}) => {
    return (
      <ScaleDecorator>
        <TouchableOpacity onLongPress={drag} disabled={isActive}>
          <Text>{`${item.name}, ${item.country}`}</Text>
        </TouchableOpacity>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <SearchBar
        onCancel={() => setFoundCities([])}
        onChangeText={setSearchbarCityValue}
        onClear={() => console.log('Search cleared')}
        //onEndEditing={}
        onTouchStart={handleSearchStarted}
        setIsSearchBarFocused={setIsSearchBarFocused}
        placeholder="Search City"
        value={searchbarCityValue}
      />
      <Text>
        {isSearchBarFocused || foundCities.length > 0 ? (
          <FlatList
            data={foundCities}
            ListHeaderComponent={renderFoundCitiesHeader}
            renderItem={({item}) => renderFoundCitiesItem(item)}
            ListEmptyComponent={
              searchbarCityValue !== '' ? renderFlatListEmptyItem : null
            }
          />
        ) : (
          <DraggableFlatList
            keyExtractor={item => String(item.id)}
            data={favouriteCitiesList}
            onDragEnd={({data}) => {
              store.replaceCities(data as City[]);
              setFavouriteCitiesList(toJS(store.cities));
            }}
            ListHeaderComponent={renderFavouriteCitiesHeader}
            renderItem={renderFavouriteCitiesItem}
            ListEmptyComponent={
              searchbarCityValue !== '' ? renderFlatListEmptyItem : null
            }
          />
        )}
      </Text>
    </SafeAreaView>
  );
};

export default AddCityScreen;
