import React, {useCallback, useEffect, useState} from 'react';
import {Text, SafeAreaView} from 'react-native';
import SearchBar from '../../components/Searchbar';
import styles from './styles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';

type AddCityScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'AddCityScreen'
>;

const AddCityScreen = (props: AddCityScreenProps) => {
  const [searchCity, setSearchCity] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

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

  return (
    <SafeAreaView style={styles.containerStyle}>
      <SearchBar
        onCancel={() => console.log('Search cancelled')}
        onChangeText={setSearchCity}
        onClear={() => console.log('Search cleared')}
        onEndEditing={() => console.log('Search ended, value: ', searchCity)}
        onTouchStart={() => console.log('Search started')}
        setIsSearchBarFocused={setIsSearchBarFocused}
        placeholder="Search City"
        value={searchCity}
      />
      <Text>{isSearchBarFocused ? 'Focused' : 'NOT focused'}</Text>
      {/* if not focused -> render favourite cities 
          else -> hide fav. cities */}
    </SafeAreaView>
  );
};

export default AddCityScreen;
