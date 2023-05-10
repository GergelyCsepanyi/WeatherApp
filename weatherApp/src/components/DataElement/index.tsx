import React, {ReactElement} from 'react';
import {Text, View} from 'react-native';
import styles from './styles';
import {observer} from 'mobx-react';
import {IconProps} from 'react-native-vector-icons/Icon';

type DataElementProps = {
  dataKey: string;
  dataValue: string;
  icon?: ReactElement<IconProps>;
};

const DataElement = (props: DataElementProps) => {
  return (
    <View style={styles.containerStyle}>
      <Text style={styles.dataKeyStyle}>{props.dataKey}</Text>
      {props.icon || null}
      <Text style={styles.dataValueStyle}>{props.dataValue}</Text>
    </View>
  );
};

export default observer(DataElement);
