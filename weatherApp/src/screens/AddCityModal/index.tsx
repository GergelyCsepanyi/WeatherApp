import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, SafeAreaView, ActivityIndicator} from 'react-native';
import SearchBarList from '../../components/SearchBarListTWO';
import SearchBar from '../../components/Searchbar';
import styles from './styles';

const AddCityModal = () => {
  const [searchCity, setSearchCity] = useState('');
  const [isSearchBarFocused, setIsSearchBarFocused] = useState(false);

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

export default AddCityModal;
