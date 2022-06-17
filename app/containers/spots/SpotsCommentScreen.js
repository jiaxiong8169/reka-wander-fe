import * as React from 'react';
import {View, StyleSheet, Dimensions, Alert, Pressable} from 'react-native';
import {Image, RefreshControl} from 'react-native';
import {Box, Heading, Text, ArrowBackIcon, TextArea} from 'native-base';
import CommentCard from '../../components/CommentCard';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {RatingButton} from '../../components/RatingButton';
import {LoadMore} from '../../components/LoadMore';
import GradientBackground from '../../components/GradientBackground';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';

const height = Dimensions.get('window').height;

export default function SpotsCommentScreen({navigation, route}) {
  const {authData} = useAuth();
  const {id, type} = route.params;
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [reviewDataList, setReviewDataList] = React.useState([]);
  const [rating, setRating] = React.useState(5);
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [currentLimit, setCurrentLimit] = React.useState(10);
  const [editReview, setEditReview] = React.useState(false);
  const [myReview, setMyReview] = React.useState(null);

  // on reload, get all reviews including my review
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
          // get all reviews
          Promise.all(promises).then(values => {
            let tmp = values.map(v => v.data);
            tmp.reverse();
            setReviewDataList(tmp);
            // set my review
            const myRev = tmp.find(t => t.userId === authData.id);
            setMyReview(myRev);
            // set text area and rating values if my review exits
            if (!!myRev) {
              setTextAreaValue(myRev.contents);
              setRating(myRev.rating);
            }
            // set loading and reload to false indicating finished loading
            setLoading(false);
            setReload(false);
          });
        }
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
          userName: authData.name ? authData.name : 'User',
          userProfileSrc: '',
          contents: textAreaValue,
          userId: authData.id,
        }).then(d => {
          // reload the reviews
          setEditReview(false);
          setReload(true);
          setLoading(false);
        });
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      Alert.alert('Please register an account to continue this action.');
      setLoading(false);
    }
  };

  return (
    <GradientBackground
      fullWidth
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={() => setReload(true)}
        />
      }
      navigation={navigation}>
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: item.thumbnailSrc}} />
        <View style={styles.textContainer}>
          <CustomText fontSize="xl">{item.name}</CustomText>
          <CustomText mt="3" mb="3">
            {item.description}
          </CustomText>
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
      {(!myReview || (!!myReview && editReview)) && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingHorizontal: 20,
          }}>
          <TextArea
            h={20}
            placeholder="Write your review..."
            onChangeText={setTextAreaValue}
            value={textAreaValue}
            mb={3}
          />
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
            }}>
            <RatingButton
              rating={rating}
              editable
              onPress={v => {
                setRating(v);
              }}
            />
            <CustomButton
              onPress={() => handleReview()}
              size="sm"
              colorScheme="secondary">
              Post
            </CustomButton>
          </View>
        </View>
      )}
      {!!myReview && !editReview && (
        <CommentCard
          key={myReview.id}
          comment={myReview.contents}
          date={new Date(myReview.timestamp).toLocaleDateString()}
          time={new Date(myReview.timestamp).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })}
          rating={myReview.rating}
          commentorName="Your Reviews"
          imgSrc={myReview.userProfileSrc}
          style={{backgroundColor: '#bbcbfa'}}
          canEdit
          setEditReview={setEditReview}
        />
      )}
      {reviewDataList
        .filter(x => x.id !== 'newReview' && x.userId !== authData.id)
        .slice(0, currentLimit)
        .map(e => {
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
    </GradientBackground>
  );
}
const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    position: 'relative',
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
