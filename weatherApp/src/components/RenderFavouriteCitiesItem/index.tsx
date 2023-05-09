import React from 'react';
import {
  RenderItemParams,
  ScaleDecorator,
} from 'react-native-draggable-flatlist';
import {City} from '../../stores/CityStore';
import {Text, TouchableOpacity, View} from 'react-native';
import {useCityStore} from '../../contexts/StoreContext';
import {useSwipe} from '../../hooks/useSwipe';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

const RenderFavouriteCitiesItem = ({
  item,
  drag,
  isActive,
}: RenderItemParams<City>) => {
  const cityStore = useCityStore();

  function onSwipeLeft() {
    cityStore.removeCity(item.id);
  }

  function onSwipeRight() {}

  const {onTouchStart, onTouchEnd} = useSwipe(onSwipeLeft, onSwipeRight);

  return (
    <ScaleDecorator>
      <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <TouchableOpacity
          onLongPress={drag}
          disabled={isActive}
          style={styles.favouriteCitiesItemContainer}>
          <Text
            style={
              styles.favouriteCitiesItem
            }>{`${item.name}, ${item.country}`}</Text>
          <MaterialIcon name="menu" style={styles.favouriteCitiesIconStyle} />
        </TouchableOpacity>
      </View>
    </ScaleDecorator>
  );
};

export default RenderFavouriteCitiesItem;
