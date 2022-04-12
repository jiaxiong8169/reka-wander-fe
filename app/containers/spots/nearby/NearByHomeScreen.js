import {
  View,
  useWindowDimensions,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import {FlatList, Image} from 'react-native';
import {SearchIcon, Text} from 'native-base';
import GradientBackground from '../../../components/GradientBackground';
import {TabView, SceneMap} from 'react-native-tab-view';
import {TabBar} from 'react-native-tab-view';
import {TouchableOpacity} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');
//you need to preview n items.
const previewCount = 3;
//to center items
//the screen will show `previewCount` + 1/4 firstItemWidth + 1/4 lastItemWidth
//so for example if previewCount = 3
//itemWidth will be =>>> itemWidth = screenWidth / (3 + 1/4 + 1/4)
const itemWidth = width / (previewCount + 0.5);
const startScroll = 0;

export default function NearByHomeScreen({navigation}) {
  const data = [...Array(10).keys()];
  const flatlistRef = React.useRef();

  React.useEffect(() => {
    if (flatlistRef.current)
      flatlistRef.current.scrollToOffset({
        offset: startScroll,
        animated: false,
      });
  }, [flatlistRef]);

  const snapToOffsets = data.map((x, i) => {
    return i * itemWidth + startScroll;
  });

  const Nearby_Spots = () => (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* <SearchIcon
          size="6"
          mx={2}
          style={{alignSelf: 'flex-end'}}
          onPress={() => navigation.navigate('NearBySearch')}
        /> */}
        <View style={{marginBottom: 10}}>
          <Text bold fontSize={18} marginLeft={2}>
            Nearby Restaurants {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() => navigation.navigate('NearByCategory')}>
              {'View More>>'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() => navigation.navigate('NearByDetails')}>
                <Image
                  source={require('../../../assets/restaurant.jpg')}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginBottom: 10}}>
          <Text bold fontSize={18} marginLeft={2}>
            Nearby Places {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() => navigation.navigate('NearByCategory')}>
              {'View More>>'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() => navigation.navigate('NearByDetails')}>
                <Image
                  source={require('../../../assets/experiences.jpg')}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={{marginBottom: 20}}>
          <Text bold fontSize={18} marginLeft={2}>
            Nearby Hotels {'  '}
            <Text
              underline
              mt="2"
              fontSize={15}
              color="blue.600"
              onPress={() => navigation.navigate('NearByCategory')}>
              {'View More>>'}
            </Text>
          </Text>
          <FlatList
            ref={flatlistRef}
            horizontal={true}
            decelerationRate={0}
            snapToOffsets={snapToOffsets}
            snapToAlignment={'center'}
            showsHorizontalScrollIndicator={false}
            data={data}
            renderItem={({item, index}) => (
              <TouchableOpacity
                style={styles.view}
                onPress={() => navigation.navigate('NearByDetails')}>
                <Image
                  source={require('../../../assets/home.jpg')}
                  style={{
                    flex: 1,
                    width: null,
                    height: null,
                    resizeMode: 'cover',
                    borderRadius: 10,
                  }}
                />
              </TouchableOpacity>
            )}
          />
        </View>
      </ScrollView>
    </GradientBackground>
  );

  const renderScene = SceneMap({
    first: Nearby_Spots,
  });

  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([{key: 'first', title: 'Nearby Spots'}]);

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
    backgroundColor: '#eee',
    width: itemWidth - 20, //20 is margin left and right
    margin: 10,
    height: 140,
    borderRadius: 10,
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
