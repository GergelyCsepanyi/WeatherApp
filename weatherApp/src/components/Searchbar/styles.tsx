import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {flexDirection: 'row', justifyContent: 'space-between'},
  searchbarContainerStyle: {
    width: '100%',
    height: 45,
    alignSelf: 'center',
    backgroundColor: Colors.white,
    borderRadius: 20,
    justifyContent: 'center',
    borderColor: Colors.grey,
    borderWidth: 1,
  },
  searchbarContainerStyleOnFocus: {
    width: '80%',
  },
  inputContainerStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
    borderRadius: 0.1,
    backgroundColor: Colors.white,
  },
  inputStyle: {
    height: 35,
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
});

export default styles;
