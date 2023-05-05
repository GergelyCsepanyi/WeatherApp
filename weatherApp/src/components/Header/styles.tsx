import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

export const styles = StyleSheet.create({
  containerStyle: {
    alignItems: 'center',
  },
  cityTextStyle: {
    fontSize: 22,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
  conditionsTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
  temperatureTextStyle: {
    fontSize: 38,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
});

export default styles;
