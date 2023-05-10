import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import {View, useWindowDimensions} from 'react-native';
import CityScreen from '../CityScreen';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';
import {useCityStore} from '../../contexts/StoreContext';
import {observer} from 'mobx-react';
import {City} from '../../stores/CityStore';

type CitiesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CitiesScreen'
>;

const CitiesScreen = (props: CitiesScreenProps) => {
  const width = useWindowDimensions().width;
  const cityStore = useCityStore();

  const handlePress = useCallback(() => {
    props.navigation.navigate('AddCityScreen');
  }, [props.navigation]);

  useEffect(() => {
    props.navigation.setOptions({
      headerRight: () =>
        RenderIconButton({
          name: 'queue',
          size: 30,
          color: 'black',
          onPress: handlePress,
        }),
    });
  }, [props, handlePress]);

  useEffect(() => {
    props.navigation.setOptions({
      title: 'sss',
    });
  }, [props.navigation]);

  return (
    <View style={styles.swiperContainerStyle}>
      {/* <FlatList
        data={cities}
        renderItem={({item}) => (
          <View style={[styles.swiperChildStyle, {width}]}>
            <CityScreen city={item} />
          </View>
        )}
      /> */}
      <SwiperFlatList
        index={0}
        showPagination
        data={cityStore.cities}
        renderItem={({item}: {item: City}) => (
          <View style={[styles.swiperChildStyle, {width}]}>
            <CityScreen city={item} />
          </View>
        )}
      />
    </View>
  );
};

export default observer(CitiesScreen);
