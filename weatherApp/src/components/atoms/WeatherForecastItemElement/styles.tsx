import {StyleSheet} from 'react-native';
import Colors from '../../../themes/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
  },
  iconContainer: {
    flex: 1,
    height: 32,
    width: '10%',
    //borderWidth: 2,
    alignSelf: 'center',
    textAlign: 'center',
    alignContent: 'center',
    alignItems: 'center',
    paddingTop: 3,
    color: Colors.defaultTextColor,
  },
  textContainer: {
    //flex: 1,
    //borderWidth: 2,
    width: '80%',
    // height: 32,

    textAlign: 'left',
    alignSelf: 'center',
    padding: 0,
    alignItems: 'center',
  },
  text: {
    //flex: 1,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'left',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
});

export default styles;
