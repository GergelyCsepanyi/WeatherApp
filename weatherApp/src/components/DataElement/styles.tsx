import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    flexWrap: 'wrap',
    // alignItems: 'center',

    flexDirection: 'row',
    // minHeight: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
  },
  dataKeyStyle: {
    flexWrap: 'wrap',
    flex: 3,
    fontSize: 16,
    fontWeight: '500',
    alignSelf: 'center',
    color: Colors.defaultTextColor,
  },
  iconStyle: {
    flex: 1,
    textAlign: 'center',
    color: Colors.defaultTextColor,
  },
  dataValueStyle: {
    flex: 2,
    flexWrap: 'wrap',

    fontSize: 16,
    fontWeight: '500',
    textAlign: 'right',
    alignSelf: 'center',
    color: Colors.grey,
  },
});

export default styles;
