import React, {useCallback, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import styles from './styles';
import {View, useWindowDimensions} from 'react-native';
import CityScreen from '../CityScreen';
import SwiperFlatList from 'react-native-swiper-flatlist';
import cirtStore from '../../store/city';
import {RootStackParamList} from '../CitiesStackScreen';
import RenderIconButton from '../../components/RenderIconButton';
import {observer} from 'mobx-react';

type CitiesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CitiesScreen'
>;

const CitiesScreen = (props: CitiesScreenProps) => {
  const width = useWindowDimensions().width;

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

  return (
    <View style={styles.swiperContainerStyle}>
      <SwiperFlatList
        //autoplay
        //autoplayDelay={2}
        //autoplayLoop
        index={0}
        showPagination
        data={cirtStore.cities}
        renderItem={({item}) => (
          <View style={[styles.swiperChildStyle, {width}]}>
            <CityScreen city={item} />
          </View>
        )}
      />
    </View>
  );
};

export default observer(CitiesScreen);
