import {StyleSheet} from 'react-native';
import Colors from '../../../themes/Colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.defaultTextColor,
    borderRadius: 5,
    borderTopRightRadius: 40,
    width: 200,
  },
  dayTextContainer: {
    height: 40,
    borderBottomWidth: 2,
    paddingStart: 10,
    alignSelf: 'flex-start',
  },
  dayText: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.defaultTextColor,
    paddingTop: 10,
  },
  dataContainer: {
    width: '100%',
  },
});

export default styles;
