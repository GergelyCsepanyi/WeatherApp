import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    width: '95%',
    alignSelf: 'center',
  },
  favouriteCitiesListContainer: {
    //flex: 1,
    //width: '100%',

    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
  },
  favouriteCitiesItemContainer: {
    //flex: 1,
    //width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    borderWidth: 2,
  },
  favouriteCitiesItem: {flex: 3, fontSize: 16, fontWeight: '500'},
  favouriteCitiesIconStyle: {
    flex: 1,
    textAlign: 'center',
  },

  // containerStyle: {
  //   flex: 1,
  //   flexDirection: 'row',
  //   height: 30,
  //   borderBottomWidth: 0.3,
  //   borderBottomColor: Colors.grey,
  // },
  // dataKeyStyle: {flex: 3, fontSize: 16, fontWeight: '500'},
  // iconStyle: {
  //   flex: 1,
  //   textAlign: 'center',
  // },
  // dataValueStyle: {
  //   flex: 2,
  //   fontSize: 16,
  //   fontWeight: '500',
  //   textAlign: 'right',
  //   color: Colors.grey,
  // },
});

export default styles;
