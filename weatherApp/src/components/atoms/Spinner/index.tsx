import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import Colors from '../../../themes/Colors';

type SpinnerProps = {
  color?: string;
};

const Spinner = (props: SpinnerProps) => {
  const {color} = props;

  return (
    <View>
      <ActivityIndicator color={color || Colors.lightBlue} size={150} />
    </View>
  );
};

export default Spinner;
