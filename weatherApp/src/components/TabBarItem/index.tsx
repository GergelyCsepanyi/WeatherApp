import React from 'react';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AddCityScreen from '../../screens/AddCityScreen';
import CitiesStackScreen from '../../screens/CitiesStackScreen';
import CityScreen from '../../screens/CityScreen';

type TabBarItemProps = {
  Tab;
  screenName: string;
  screenTitle: string;
  tabBarIconToRender: 'location' | 'favourites';
  componentToRender: 'CitiesStackScreen' | 'AddCityScreen' | 'CityScreen';
};

const renderFilledFavouriteIcon = () => (
  <MaterialIcon name="favorite" size={30} color="black" />
);
const renderLocationIcon = () => (
  <MaterialIcon name="room" size={30} color="black" />
);

const renderTabBarIcon = (tabBarIconToRender: 'location' | 'favourites') => {
  let renderFunction;
  switch (tabBarIconToRender) {
    case 'favourites':
      renderFunction = renderFilledFavouriteIcon();
      break;
    case 'location':
      renderFunction = renderLocationIcon();
      break;
    default:
      throw new Error('Not implemented render type');
  }
  return renderFunction;
};

const renderComponent = (
  componentToRender: 'CitiesStackScreen' | 'AddCityScreen' | 'CityScreen',
) => {
  let component;
  switch (componentToRender) {
    case 'AddCityScreen':
      component = AddCityScreen;
      break;
    case 'CitiesStackScreen':
      component = CitiesStackScreen;
      break;
    case 'CityScreen':
      component = CityScreen;
      break;
  }
  return component;
};

const TabBarItem = (props: TabBarItemProps) => {
  const {Tab, tabBarIconToRender, screenName, screenTitle, componentToRender} =
    props;
  return (
    <Tab.Screen
      name={screenName}
      options={{
        title: {screenTitle},
        tabBarIcon: () => renderTabBarIcon(tabBarIconToRender),
      }}
      component={() => renderComponent(componentToRender)}
    />
  );
};

{
  /* <TabBar.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{ tabBarIcon: HomeTabBar }}
      />


export const HomeTabBar = ({ focused }: BarProps) => {
  const theme = useTheme()
  const color = useColor(focused, theme)

  return (
    <TabBarWrapper>
      <HomeIcon fill={color} stroke={color} width={TAB_BAR_ICON_SIZE} height={TAB_BAR_ICON_SIZE} />
      <Typography.Body size='s' weight='regular' text='Home' color={color} style={styles.text} />
    </TabBarWrapper>
  )
} */
}

export default TabBarItem;
