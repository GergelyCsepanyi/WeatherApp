import {StyleSheet} from 'react-native';
import Colors from '../../theme/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
    paddingBottom: 10,
  },
  titleTextStyle: {fontSize: 20, fontWeight: 'bold'},
  descriptionTextStyle: {fontSize: 16, color: Colors.grey},
});

export default styles;
