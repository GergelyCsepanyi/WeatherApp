import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {Stack} from 'react-native-spacing-system';

type DescriptionElementProps = {
  descriptions: string[];
  title: string;
};

const DescriptionElement = (props: DescriptionElementProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.titleTextStyle}>{props.title}</Text>
      <Stack size={3} />
      {props.descriptions.map((desc, index) => (
        <Text key={index} style={styles.descriptionTextStyle}>
          {desc}
        </Text>
      ))}
    </View>
  );
};

export default DescriptionElement;
