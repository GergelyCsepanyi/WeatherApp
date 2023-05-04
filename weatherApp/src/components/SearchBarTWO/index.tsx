import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button, Keyboard, TextInput, View} from 'react-native';
import styles from './styles';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setClicked}) => {
  return (
    <View style={styles.container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />

        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setClicked(true);
          }}
        />

        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>

      {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setClicked(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;
