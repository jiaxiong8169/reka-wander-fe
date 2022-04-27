import * as React from 'react';
import {View, StyleSheet, Dimensions, Alert, Pressable} from 'react-native';
import {Image, RefreshControl} from 'react-native';
import {Box, Heading, Text, ArrowBackIcon, TextArea} from 'native-base';
import {ScrollView} from 'react-native';
import CommentCard from '../../components/CommentCard';
import {useHttpCall} from '../../hooks/useHttpCall';
import FastImage from 'react-native-fast-image';
import {useAuth} from '../../hooks/useAuth';
import {RatingButton} from '../../components/RatingButton';
import moment from 'moment';
import {LoadMore} from '../../components/LoadMore';

const height = Dimensions.get('window').height;

export default function SpotsCommentScreen({navigation, route}) {
  const {authData} = useAuth();
  const {id, type} = route.params;
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [reviewDataList, setReviewDataList] = React.useState([]);
  const [rating, setRating] = React.useState(0);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [currentLimit, setCurrentLimit] = React.useState(10);

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
          Promise.all(promises).then(values => {
            let tmp = values.map(v => v.data);
            tmp.reverse();
            setReviewDataList(tmp);
          });
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

  const handleReview = async () => {
    if (loading) return; // do not proceed when loading is true
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
          // add a dummy record to block update review
          setReviewDataList(oldArray => [
            {
              targetId: id,
              rating: rating,
              userName: authData.name ? authData.name : 'User', // TODO: Enforce user name in auth module
              userProfileSrc: '',
              contents: textAreaValue,
              userId: authData.id,
              id: 'newReview',
              timestamp: moment(new Date()).format(
                'YYYY-MM-DD[T00:00:00.000Z]',
              ),
            },
            ...oldArray,
          ]);
          setLoading(false);
        });
        setTextAreaValue('');
        setRating(0);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      Alert.alert('Please register an account to continue this action.');
      setLoading(false);
    }
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
          <View
            style={{
              marginRight: 'auto',
              marginBottom: 6,
            }}>
            <RatingButton rating={item.avgRating} />
          </View>
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
          </View>
        </View>
      </View>
      <View style={[styles.textContainer, {alignItems: 'center'}]}>
        <Heading size="sm">Reviews & Comments</Heading>
      </View>
      {!reviewDataList.find(
        x => x.id === 'newReview' || x.userId === authData.id,
      ) && (
        <View>
          <View style={styles.commentBox}>
            <TextArea
              h={20}
              px="3"
              placeholder="Write your review..."
              onChangeText={valueControlledTextArea}
              value={textAreaValue}
            />
          </View>
          <View
            style={{
              position: 'relative',
              top: -16,
              alignSelf: 'flex-start',
              marginHorizontal: 20,
            }}>
            <RatingButton rating={rating} editable onPress={setRating} />
          </View>
          <Pressable style={styles.button} onPress={() => handleReview()}>
            <Text style={styles.buttonText}>Post</Text>
          </Pressable>
        </View>
      )}
      {reviewDataList.slice(0, currentLimit).map(e => {
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
            imgSrc={e.userProfileSrc}
          />
        );
      })}
      <LoadMore
        getData={() => setCurrentLimit(oldValue => oldValue + 10)}
        full={reviewDataList.length - currentLimit < 0}
      />
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
    padding: 15,
    marginHorizontal: 20,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    marginBottom: 10,
    justifyContent: 'center',
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
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    borderRadius: 5,
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
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
