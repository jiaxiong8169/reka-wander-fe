import * as React from 'react';
import {View, StyleSheet, Dimensions, Alert} from 'react-native';
import {Image, RefreshControl} from 'react-native';
import {
  Box,
  Heading,
  Text,
  ArrowBackIcon,
  Pressable,
  TextArea,
} from 'native-base';
import {Rating} from 'react-native-ratings';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CommentCard from '../../components/CommentCard';
import {useHttpCall} from '../../hooks/useHttpCall';
import FastImage from 'react-native-fast-image';
import {useAuth} from '../../hooks/useAuth';
import DeviceInfo from 'react-native-device-info';
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

const height = Dimensions.get('window').height;

export default function SpotsCommentScreen({navigation, route}) {
  const {authData} = useAuth();
  const dispatch = useDispatch();
  const {id, type} = route.params;
  const listData = useSelector(state => state.nearbyReducer[type]);
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [reviews, setReviews] = React.useState([]);
  const [reviewDataList, setReviewDataList] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [textAreaValue, setTextAreaValue] = React.useState('');

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
          // Prepare promises
          const promises = data.reviews.map(id => getWithAuth(`reviews/${id}`));
          // TODO: Implement pagination
          Promise.all(promises).then(values => {
            let tmp = values.map(v => v.data);
            tmp.reverse();
            setReviewDataList(tmp);
          });
          setReviews(data.reviews);
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

  const handleReview = async () => {
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
    if (authData && authData.id) {
      try {
        postWithAuth(`${currentType}/review`, {
          targetId: id,
          rating: rating,
          userName: authData.name ? authData.name : 'User', // TODO: Enforce user name in auth module
          userProfileSrc: '',
          contents: textAreaValue,
          userId: authData.id,
        }).then(() => {
          setReload(true);
        });
        setTextAreaValue('');
        setRating(0);
      } catch (err) {
        console.log(err);
      }
    } else {
      Alert.alert('Please register an account to continue this action.');
    }
  };

  const ratingCompleted = rating => {
    setRating(rating);
  };

  const valueControlledTextArea = value => {
    setTextAreaValue(value);
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
        <Box style={styles.backButton}>
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowBackIcon size="8" m="1" color="white" />
          </Pressable>
        </Box>
        <View style={styles.textContainer}>
          <Heading size="2xl">{item.name}</Heading>
          <Text mt="3" mb="3">
            {item.description}
          </Text>

          <Rating
            style={{
              marginRight: 'auto',
              marginBottom: 6,
            }}
            imageSize={15}
            ratingCount={5}
            startingValue={item.avgRating}
            tintColor={'white'}
            readonly
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/pin.png')}
              tintColor={'#52525b'}
            />
            <Text marginLeft="1" fontSize={10} color="gray.600">
              {item.city}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginTop: 4,
            }}>
            <Image
              style={{width: 15, height: 15}}
              source={require('../../assets/money.png')}
              tintColor={'#52525b'}
            />
            <Text marginLeft="1" fontSize={10} color="gray.600">
              RM {item.price ? item.price : item.minPrice}
            </Text>
            <View style={{marginLeft: 'auto', flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => handleLike()}
                style={{flex: 1, justifyContent: 'center'}}>
                <Image
                  style={{width: 15, height: 15, marginHorizontal: 2}}
                  source={require('../../assets/love.png')}
                  tintColor={liked ? 'red' : 'gray'}
                />
              </TouchableOpacity>
              <Text
                marginLeft="1"
                fontSize={10}
                color={liked ? 'red.500' : 'gray.500'}>
                {likes}
              </Text>
              <Image
                style={{width: 15, height: 15, marginHorizontal: 10}}
                source={require('../../assets/message.png')}
                tintColor={'#52525b'}
              />
              <Text fontSize={10} color="gray.600">
                {reviews ? reviews.length : 0}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.textContainer}>
        <Heading size="sm">Reviews & Comments</Heading>
      </View>
      <View style={styles.commentBox}>
        <TextArea
          h={20}
          px="3"
          placeholder="Write your review..."
          onChangeText={valueControlledTextArea}
          value={textAreaValue}
        />
      </View>

      <Rating
        style={{
          position: 'relative',
          top: -16,
          alignSelf: 'flex-start',
          marginHorizontal: 20,
        }}
        imageSize={15}
        ratingCount={5}
        startingValue={rating}
        onFinishRating={ratingCompleted}
        tintColor="#eee"
      />
      <Pressable style={styles.button} onPress={() => handleReview()}>
        <Text style={styles.buttonText}>Post</Text>
      </Pressable>

      {reviewDataList.map(e => {
        return (
          <CommentCard
            key={e.id}
            comment={e.contents}
            date={new Date(e.timestamp).toLocaleDateString()}
            time={new Date(e.timestamp).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              hour12: true,
            })}
            rating={e.rating}
            commentorName={e.userName}
            imgSrc={e.userProfileSrc}></CommentCard>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    padding: 20,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginBottom: 10,
  },
  commentBox: {
    backgroundColor: 'white',
    borderRadius: 5,
    position: 'relative',
    right: 0,
    left: 0,
    top: -16,
    width: '90%',
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 5,
    shadowOpacity: 1.0,
    elevation: 8,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    position: 'relative',
  },
  image: {
    flex: 1,
    width: '100%',
    position: 'relative',
    height: height * 0.35,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
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
  backButton: {
    position: 'absolute',
    left: 10,
    top: 10,
    alignSelf: 'flex-start',
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 1,
    borderRadius: 20,
    backgroundColor: '#dc2626',
    position: 'relative',
    top: -17,
    marginBottom: 10,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 9,
  },
});
