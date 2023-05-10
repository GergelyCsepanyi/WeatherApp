import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleTextStyle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.defaultTextColor,
  },
  descriptionTextStyle: {fontSize: 16, color: Colors.grey},
});

export default styles;
