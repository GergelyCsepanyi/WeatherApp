import {StyleSheet} from 'react-native';
import Colors from '../../../themes/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
    width: '100%',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    //flex: 1,
    height: 32,
    width: '10%',
    //borderWidth: 2,
    alignSelf: 'center',
    color: Colors.defaultTextColor,
  },
  textContainer: {
    //flex: 1,
    //borderWidth: 2,
    width: '90%',
    // height: 32,

    textAlign: 'left',
    alignSelf: 'center',
    padding: 0,
    color: Colors.defaultTextColor,
    alignItems: 'center',
  },
  text: {
    //flex: 1,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default styles;
