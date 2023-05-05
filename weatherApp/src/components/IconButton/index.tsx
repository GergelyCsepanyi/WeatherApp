import React from 'react';
import {TouchableOpacity} from 'react-native';
import {IconProps} from 'react-native-vector-icons/Icon';
import styles from './styles';

type IconButtonProps = {
  icon: React.ReactElement<IconProps>;
  onPress: () => void;
};

const IconButton = (props: IconButtonProps) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.containerStyle}>
      {props.icon}
    </TouchableOpacity>
  );
};

export default IconButton;
