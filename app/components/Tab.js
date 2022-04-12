import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import GradientBackground from './GradientBackground';
import React from 'react';
import {FlatList, Text} from 'react-native';
import {TabBar} from 'react-native-tab-view';
import SpotsHomeScreen_Places from '../containers/spots/SpotsHomeScreen_Places';

const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);
//to center items you start from 3/4 firstItemWidth
const startScroll = (itemWidth * 3) / 4;

export default function Tab({navigation}) {
  const Event = () => <GradientBackground></GradientBackground>;

  const Reward = () => <GradientBackground></GradientBackground>;

  const Places = () => <SpotsHomeScreen_Places navigation={navigation} />;

  const renderScene = SceneMap({
    first: Event,
    second: Reward,
    third: Places,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(2);
  const routes = [
    {key: 'first', title: 'Event'},
    {key: 'second', title: 'Reward'},
    {key: 'third', title: 'Places'},
  ];

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      renderTabBar={props => (
        <TabBar {...props} indicatorStyle={styles.noIndicator}></TabBar>
      )}></TabView>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 100,
    backgroundColor: '#eee',
    width: itemWidth - 20, //20 is margin left and right
    margin: 10,
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#aaa',
  },
  noIndicator: {
    backgroundColor: 'transparent',
  },
});
