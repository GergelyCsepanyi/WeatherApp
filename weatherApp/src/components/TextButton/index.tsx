import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './styles';

interface TextButtonProps {
  text: string;
  color?: string;
  fontSize?: number;

  onPress?: () => void;
}

class TextButton extends React.Component<TextButtonProps, {}> {
  render(): React.ReactNode {
    return (
      <TouchableOpacity
        style={[styles.touchableOpacityStyle]}
        onPress={this.props.onPress}>
        <Text
          style={[
            styles.textStyle,
            this.props.color ? {color: this.props.color} : {},
            this.props.fontSize ? {fontSize: this.props.fontSize} : {},
          ]}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

export default TextButton;
