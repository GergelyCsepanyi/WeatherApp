import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import DataElement from '../DataElement';
import {Stack} from 'react-native-spacing-system';

const DataSection = () => {
  return (
    <View>
      <ScrollView style={styles.innerContainerStyle}>
        <Stack size={20} />
        <DataElement dataKey="Data" dataValue="temperature" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" renderIcon={true} />
      </ScrollView>
    </View>
  );
};

export default DataSection;
