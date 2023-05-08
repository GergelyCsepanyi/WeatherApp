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

export default TabBarItem;
