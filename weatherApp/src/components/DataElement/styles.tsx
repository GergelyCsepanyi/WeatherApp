import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexDirection: 'row',
    height: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
  },
  dataKeyStyle: {flex: 3, fontSize: 16, fontWeight: '500'},
  iconStyle: {
    flex: 1,
    textAlign: 'center',
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
