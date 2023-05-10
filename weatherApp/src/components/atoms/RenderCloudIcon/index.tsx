import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

type RenderCloudIconProps = {
  size?: number;
};

const RenderCloudIcon = (props: RenderCloudIconProps) => {
  return (
    <MaterialIcon
      style={styles.iconStyle}
      name="cloud-queue"
      size={props.size || 22}
    />
  );
};

export default RenderCloudIcon;
