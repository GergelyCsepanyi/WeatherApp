import React from 'react';
import {ScrollView, View} from 'react-native';
import styles from './styles';
import DataElement from '../DataElement';
import {Stack} from 'react-native-spacing-system';
import DescriptionElement from '../DescriptionElement';

const DataSection = () => {
  return (
    <View>
      <ScrollView style={styles.containerStyle}>
        <Stack size={20} />
        <DataElement dataKey="Data" dataValue="temperature" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" />
        <Stack size={10} />
        <DataElement dataKey="Data" dataValue="temperature" renderIcon={true} />
        <Stack size={10} />
        <DescriptionElement description="Description (min & max temperature, weather conditions)" />
        <Stack size={10} />
        <DataElement dataKey="Sunset" dataValue="Time" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Sunrise" dataValue="Time" renderIcon={true} />
        <Stack size={10} />
        <DataElement dataKey="Wind" dataValue="Details" renderIcon={true} />
      </ScrollView>
    </View>
  );
};

export default DataSection;
