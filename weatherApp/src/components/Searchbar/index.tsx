import React, {useEffect, useState, useRef} from 'react';
import {SearchBar} from '@rneui/base';
import styles from './styles';
import {TextInput, View} from 'react-native';
import TextButton from '../TextButton';

type SearchBarComponentProps = {
  placeholder: string;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
  cancelButtonText: string;
  onTouchStart?: () => void;
  onEndEditing?: () => void;
  onClear?: () => void;
  onCancel?: () => void;
  setIsSearchBarFocused?: React.Dispatch<React.SetStateAction<boolean>>;
};

const SearchBarComponent = (props: SearchBarComponentProps) => {
  const [isFocus, setIsFocus] = useState(false);

  const searchBarRef = useRef<SearchBar & TextInput>(null);

  useEffect(() => {
    if (isFocus) {
      searchBarRef?.current?.focus();
      props.setIsSearchBarFocused && props.setIsSearchBarFocused(true);
    } else {
      searchBarRef?.current?.blur();
      props.setIsSearchBarFocused && props.setIsSearchBarFocused(false);
    }
  }, [isFocus, props]);

  const handleCancel = () => {
    if (props.onCancel) {
      setIsFocus(false);
      props.onCancel();
      props.onChangeText('');
    }
  };

  return (
    <View style={styles.containerStyle}>
      <SearchBar
        containerStyle={[
          styles.searchbarContainerStyle,
          isFocus && styles.searchbarContainerStyleOnFocus,
        ]}
        inputContainerStyle={styles.inputContainerStyle}
        inputStyle={styles.inputStyle}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        value={props.value}
        onEndEditing={props.onEndEditing && props.onEndEditing}
        onTouchStart={props.onTouchStart && props.onTouchStart}
        onClear={() => {
          setIsFocus(true);
          props.onClear && props.onClear();
        }}
        onCancel={props.onCancel && props.onCancel}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        ref={searchBarRef}
      />
      {isFocus ? (
        <TextButton text={props.cancelButtonText} onPress={handleCancel} />
      ) : null}
    </View>
  );
};
export default SearchBarComponent;
