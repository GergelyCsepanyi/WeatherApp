import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

type RenderFeatherIconProps = {
  name: string;
  iconRotateDeg?: number;
  size?: number;
};

const RenderFeatherIcon = (props: RenderFeatherIconProps) => {
  return (
    <Feather
      style={[
        styles.iconStyle,
        props.iconRotateDeg
          ? {transform: [{rotate: `${props.iconRotateDeg}deg`}]}
          : null,
      ]}
      name={props.name}
      size={props.size || 22}
    />
  );
};

export default RenderFeatherIcon;
