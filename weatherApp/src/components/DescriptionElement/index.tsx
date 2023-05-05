import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Stack} from 'react-native-spacing-system';

type DescriptionElementProps = {
  description: string;
};

const DescriptionElement = (props: DescriptionElementProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>Today</Text>
      <Stack size={3} />
      <Text style={styles.descriptionTextStyle}>{props.description}</Text>
    </View>
  );
};

export default DescriptionElement;
