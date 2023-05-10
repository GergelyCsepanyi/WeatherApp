import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  favouriteCitiesItemContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    marginStart: 10,
  },
  favouriteCitiesItem: {
    flex: 3,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
    alignSelf: 'center',
  },
  favouriteCitiesIconStyle: {
    flex: 1,
    fontSize: 24,
    textAlign: 'right',
    alignSelf: 'center',
    color: Colors.defaultTextColor,
  },
});

export default styles;
