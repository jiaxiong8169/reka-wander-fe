import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Share,
} from 'react-native';
import {Image} from 'react-native';
import {Heading, Text} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView} from 'react-native';
import RoundButton from '../../components/RoundButton';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import {useSelector, useDispatch} from 'react-redux';
import {
  setNearbyAttractions,
  setNearbyHotels,
  setNearbyRestaurants,
  setRestaurants,
  setAttractions,
  setHotels,
} from '../../redux/Nearby/actions';
import {BackButton} from '../../components/BackButton';
import DeviceInfo from 'react-native-device-info';

const height = Dimensions.get('window').height;

export default function SpotDetailsScreen({navigation, route}) {
  const {authData} = useAuth();
  const dispatch = useDispatch();
  const {type, id} = route.params;
  const listData = useSelector(state => state.nearbyReducer[type]);
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [shares, setShares] = React.useState(0);

  React.useEffect(() => {
    if (!reload) return;
    setLoading(true);
    // convert type to without the word nearby
    let currentType = type;
    switch (currentType) {
      case 'nearbyAttractions':
        currentType = 'attractions';
        break;
      case 'nearbyRestaurants':
        currentType = 'restaurants';
        break;
      case 'nearbyHotels':
        currentType = 'hotels';
        break;
    }
    // try to fetch the data
    getWithAuth(`${currentType}/${id}`)
      .then(({data}) => {
        if (!!data) {
          setItem(data);
          // update like and share states
          setLiked(
            data.likes.includes(
              authData?.id ? authData.id : DeviceInfo.getUniqueId(),
            ),
          );
          setLikes(data.likes.length);
          setShared(
            data.shares.includes(
              authData?.id ? authData.id : DeviceInfo.getUniqueId(),
            ),
          );
          setShares(data.shares.length);
          // update the cached data
          let clonedListData = JSON.parse(JSON.stringify(listData));
          for (let i = 0; i < clonedListData.length; i++) {
            if (clonedListData[i].id === id) {
              clonedListData[i] = data;
              break;
            }
          }
          switch (type) {
            case 'restaurants':
              dispatch(setRestaurants(clonedListData));
              break;
            case 'attractions':
              dispatch(setAttractions(clonedListData));
              break;
            case 'hotels':
              dispatch(setHotels(clonedListData));
              break;
            case 'nearbyRestaurants':
              dispatch(setNearbyRestaurants(clonedListData));
              break;
            case 'nearbyAttractions':
              dispatch(setNearbyAttractions(clonedListData));
              break;
            case 'nearbyHotels':
              dispatch(setNearbyHotels(clonedListData));
              break;
            default:
          }
        }
        // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      })
      .catch(err => {
        console.log(err);
        // set loading and reload to false indicating finished loading
        setLoading(false);
        setReload(false);
      });
  }, [reload]);

  const handleLike = async () => {
    if (loading) return; // do not proceed when loading is true
    // convert type to without the word nearby
    let currentType = type;
    switch (currentType) {
      case 'nearbyAttractions':
        currentType = 'attractions';
        break;
      case 'nearbyRestaurants':
        currentType = 'restaurants';
        break;
      case 'nearbyHotels':
        currentType = 'hotels';
        break;
    }
    // POST like API: Allow stale data to increase responsiveness
    try {
      postWithAuth(`${currentType}/like`, {
        targetId: id,
        userId:
          authData && authData.id ? authData.id : DeviceInfo.getUniqueId(),
      });
    } catch (err) {
      console.log(err);
    }

    // set likes
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleShare = async () => {
    if (loading) return; // do not proceed when loading is true
    // convert type to without the word nearby
    let currentType = type;
    switch (currentType) {
      case 'nearbyAttractions':
        currentType = 'attractions';
        break;
      case 'nearbyRestaurants':
        currentType = 'restaurants';
        break;
      case 'nearbyHotels':
        currentType = 'hotels';
        break;
    }
    // open the share component
    try {
      const result = await Share.share({
        title: `Reka Wander - ${item.name}`,
        url: item.link,
        message: `Please check out ${item.name} via: ${item.link}`,
      });
      if (result.action === Share.sharedAction) {
        // POST share API
        try {
          postWithAuth(`${currentType}/share`, {
            targetId: id,
            userId:
              authData && authData.id ? authData.id : DeviceInfo.getUniqueId(),
          });
        } catch (err) {
          console.log(err);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
    setShares(shared ? shares : shares + 1);
    setShared(true);
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => setReload(true)}
        />
      }>
      <View style={styles.container}>
        <FastImage style={styles.image} source={{uri: item.thumbnailSrc}} />
        <View style={{flex: 1}}></View>
        <BackButton navigation={navigation} absolute />

        <View style={styles.textContainer}>
          <Heading size="2xl" color={'white'}>
            {item.name}
          </Heading>

          <Text fontSize={14} color="white">
            {item.city}
          </Text>
          <View
            style={{
              flexDirection: 'row',
            }}>
            <Text bold fontSize={14} color="white">
              {item.category}
            </Text>
          </View>
          <Rating
            style={{
              marginRight: 'auto',
              marginTop: 6,
            }}
            imageSize={15}
            ratingCount={5}
            startingValue={item.avgRating}
            tintColor={'#414141'}
            readonly
          />
          <Text mt="3" mb="10" color={'white'}>
            {item.description}
          </Text>
          <RoundButton title="Direction" backgroundColor="#dc2626" />
        </View>
        <View style={styles.buttonContainer}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleLike()}
              style={{flex: 1, justifyContent: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/love.png')}
                tintColor={liked ? 'red' : 'gray'}></Image>
            </TouchableOpacity>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color={liked ? 'red.500' : 'gray.500'}
              style={styles.iconText}>
              {likes}
            </Text>
          </View>
          <TouchableOpacity
            style={{flex: 1, alignSelf: 'center', justifyContent: 'center'}}
            onPress={() => navigation.navigate('SpotsComment')}>
            <View style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/message.png')}
                tintColor="red"></Image>
              <Text
                ml={'2'}
                bold
                fontSize={12}
                color="red.500"
                style={styles.iconText}>
                {item.reviews ? item.reviews.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => handleShare()}
              style={{flex: 1, justifyContent: 'center'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/share.png')}
                tintColor={shared ? 'red' : 'gray'}></Image>
            </TouchableOpacity>
            <Text
              ml={'2'}
              bold
              fontSize={12}
              color={shared ? 'red.500' : 'gray.500'}
              style={styles.iconText}>
              {shares}
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#414141',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    minHeight: height * 0.5 + 20,
    width: '100%',
    paddingTop: '14%',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  buttonContainer: {
    height: 60,
    width: '70%',
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 20,
    left: '15%',
    right: 0,
    top: height * 0.33,
    paddingLeft: '10%',
    paddingRight: '10%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
    backgroundColor: '#414141',
  },
  image: {
    flex: 1,
    width: '100%',
    height: height * 0.4,
    position: 'relative',
  },
  icon: {
    height: 25,
    width: 25,
    alignSelf: 'center',
    tintColor: 'gray',
  },
  iconText: {
    alignSelf: 'center',
  },
});