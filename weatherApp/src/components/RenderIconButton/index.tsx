import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

type RenderIconProps = {
  name: string;
  color?: string;
  size?: number;
  onPress?: () => void;
};
const RenderIconButton = (props: RenderIconProps) => {
  return <MaterialIcon {...props} />;
};

export default RenderIconButton;
