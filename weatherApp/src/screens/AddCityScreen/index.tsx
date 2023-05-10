import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import SearchBar from '../../components/Searchbar';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';
import {FlatList} from 'react-native-gesture-handler';
import {CityResponse, citiesApi} from '../../services/CitiesAPI';
import {City} from '../../stores/CityStore';
import DraggableFlatList from 'react-native-draggable-flatlist';
import {toJS} from 'mobx';
import {Stack} from 'react-native-spacing-system';
import {useCityStore, useLanguageStore} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';
import RenderFavouriteCitiesItem from '../../components/RenderFavouriteCitiesItem';

type AddCityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddCityScreen'
>;

const AddCityScreen = (props: AddCityScreenProps) => {
  const cityStore = useCityStore();
  const languageStore = useLanguageStore();

  const [searchbarCityValue, setSearchbarCityValue] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);
  const [foundCities, setFoundCities] = useState<CityResponse[]>([]);

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

  const handleSearchBarCancel = () => {
    setFoundCities([]);
  };

  const handleCitySelection = (city: CityResponse) => {
    cityStore.addCity(city);
    setFoundCities([]);
    setSearchbarCityValue('');
  };

  const renderFlatListEmptyItem = () => {
    return (
      <View>
        <Text>{languageStore.string.noDataFound}</Text>
      </View>
    );
  };

  const renderFoundCitiesItem = (item: CityResponse) => {
    return (
      <TouchableOpacity
        onPress={() => handleCitySelection(item)}
        style={styles.foundCitiesItemContainer}>
        <Text
          style={
            styles.foundCitiesItem
          }>{`${item.name}, ${item.country}`}</Text>
      </TouchableOpacity>
    );
  };

  const renderFavouriteCitiesHeader = () => {
    return (
      <View style={styles.favouriteCitiesHeaderContainerStyle}>
        <Text style={styles.favouriteCitiesHeaderTextStyle}>
          {cityStore.cities?.length > 0
            ? languageStore.string.favouriteCities
            : null}
        </Text>
        <Stack size={3} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.containerStyle}>
      <Stack size={10} />
      <SearchBar
        onCancel={handleSearchBarCancel}
        onChangeText={setSearchbarCityValue}
        setIsSearchBarFocused={setIsSearchBarFocused}
        placeholder={languageStore.string.searchCity}
        value={searchbarCityValue}
        cancelButtonText={languageStore.string.cancel}
      />

      {isSearchBarFocused || foundCities.length > 0 ? (
        <View style={styles.foundCitiesContainer}>
          <Stack size={0} />
          <View style={styles.foundCitiesStartPlaceholder} />
          <FlatList
            showsHorizontalScrollIndicator
            style={styles.foundCitiesListContainer}
            data={foundCities}
            renderItem={({item}) => renderFoundCitiesItem(item)}
            ListEmptyComponent={
              searchbarCityValue !== '' ? renderFlatListEmptyItem : null
            }
          />
          <View
            style={
              isSearchBarFocused
                ? styles.foundCitiesEndPlaceholderFocused
                : styles.foundCitiesEndPlaceholder
            }
          />
        </View>
      ) : (
        <>
          <Stack size={10} />
          <DraggableFlatList
            style={styles.favouriteCitiesListContainer}
            keyExtractor={item => String(item.id)}
            data={toJS(cityStore.cities)}
            onDragEnd={({data}) => {
              cityStore.replaceCities(data as City[]);
            }}
            ListHeaderComponent={renderFavouriteCitiesHeader}
            renderItem={RenderFavouriteCitiesItem}
            ListEmptyComponent={
              searchbarCityValue !== '' ? renderFlatListEmptyItem : null
            }
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default observer(AddCityScreen);
