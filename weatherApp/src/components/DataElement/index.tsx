import React from 'react';
import {Text, View} from 'react-native';
import styles from './styles';

type DataElementProps = {
  dataKey: string;
  dataValue: string;
  renderIcon?: boolean;
};

const DataElement = ({...props}: DataElementProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.dataKeyStyle}>{props.dataKey}</Text>
      {props.renderIcon ? <Text style={styles.iconStyle}>icon</Text> : null}
      <Text style={styles.dataValueStyle}>{props.dataValue}</Text>
    </View>
  );
};

export default DataElement;
