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

type CitiesScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'CitiesScreen'
>;

const CitiesScreen = (props: CitiesScreenProps) => {
  const width = useWindowDimensions().width;
  const cityStore = useCityStore();

  // const [cities, setCities] = useState<City[]>(cityStore.cities);

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

  // useEffect(() => {
  //   setCities(cityStore.cities);
  //   console.log('cities changed, new cityStore.cities:', cityStore.cities);
  //   console.log('cities changed, new cities:', cities);
  // }, [cityStore, cityStore.cities]);

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
        //autoplay
        //autoplayDelay={2}
        //autoplayLoop
        index={0}
        showPagination
        data={cityStore.cities}
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
