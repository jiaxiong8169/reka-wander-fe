import {useWindowDimensions, StyleSheet, Dimensions} from 'react-native';
import {TabView, SceneMap} from 'react-native-tab-view';
import GradientBackground from './GradientBackground';
import React from 'react';
import {TabBar} from 'react-native-tab-view';
import SpotsImagesScreen from '../containers/spots/SpotsImagesScreen';

const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);

export default function Tab({navigation, route}) {
  const Event = () => <GradientBackground></GradientBackground>;

  const Reward = () => <GradientBackground></GradientBackground>;

  const Places = () => (
    <SpotsImagesScreen navigation={navigation} route={route} />
  );

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
      swipeEnabled={false}
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
