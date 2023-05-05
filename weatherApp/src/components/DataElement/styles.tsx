import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
  },
  dataKeyStyle: {
    flex: 3,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
  iconStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.defaultTextColor,
  },
  dataValueStyle: {
    flex: 2,
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    color: Colors.grey,
  },
});

export default styles;
