import {StyleSheet} from 'react-native';
import Colors from '../../themes/Colors';

const styles = StyleSheet.create({
  containerStyle: {
    width: '95%',
    alignSelf: 'center',
  },

  favouriteCitiesListContainer: {
    width: '100%',
    alignSelf: 'center',
  },
  favouriteCitiesHeaderContainerStyle: {},
  favouriteCitiesHeaderTextStyle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
  },
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

  foundCitiesContainer: {flexDirection: 'row'},
  foundCitiesListContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  foundCitiesStartPlaceholder: {width: '13.5%'},
  foundCitiesEndPlaceholder: {width: '10%'},
  foundCitiesEndPlaceholderFocused: {width: '30%'},
  foundCitiesItemContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    height: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.grey,
  },
  foundCitiesItem: {
    flex: 3,
    fontSize: 16,
    fontWeight: '500',
    color: Colors.defaultTextColor,
    alignSelf: 'center',
  },
});

export default styles;
