import {StyleSheet} from 'react-native';
import Colors from '../../../themes/Colors';

const styles = StyleSheet.create({
  titleTextContainer: {
    height: 40,
    alignSelf: 'flex-start',
  },
  titleText: {
    flex: 1,
    width: '100%',
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.defaultTextColor,
    paddingTop: 10,
  },
});

export default styles;
