import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Dimensions, RefreshControl} from 'react-native';
import {Image} from 'react-native';
import {Heading, Text} from 'native-base';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
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
import Share from 'react-native-share';
import Icon from 'react-native-vector-icons/Ionicons';
import {RatingButton} from '../../components/RatingButton';
import {LocationButton} from '../../components/Location/LocationButton';
import {CustomButton} from '../../components/CustomButton';
import {About} from '../../components/DetailsContent/About';
import {Location} from '../../components/DetailsContent/Location';
import {LocationName} from '../../components/Location/LocationName';
import {CheckInOut} from '../../components/DetailsContent/CheckInOut';
import {VendorDetails} from '../../components/DetailsContent/VendorDetails';
import {Parking} from '../../components/DetailsContent/Parking';
import {Facilities} from '../../components/DetailsContent/Facilities';
import {HomestayExpandableList} from '../../components/ExpandableListView/HomestayContent';

const height = Dimensions.get('window').height;

export default function SpotDetailsScreen({navigation, route}) {
  const {authData} = useAuth();
  const dispatch = useDispatch();
  const {
    type,
    id,
    items,
    planner,
    checkInDate,
    checkOutDate,
    totalDays,
    adults,
    children,
    guests,
    facilities,
  } = route.params;
  const listData = useSelector(state => state.nearbyReducer[type]);
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [locationName, setLocationName] = useState('');
  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  function fetchData() {
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
  }

  React.useEffect(() => {
    if (!reload) return;
    fetchData();
    console.log(item);
  }, [reload]);

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    console.log(item);
    return willFocusSubscription;
  }, []);

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
      await Share.open({
        title: `Reka Wander - ${item.name}`,
        url: item.link,
        message: `Please check out ${item.name} via:`,
      });
      // POST share API
      try {
        postWithAuth(`${currentType}/share`, {
          targetId: id,
          userId:
            authData && authData.id ? authData.id : DeviceInfo.getUniqueId(),
        });
        setShares(shared ? shares : shares + 1);
        setShared(true);
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View>
      <BackButton navigation={navigation} absolute />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={() => setReload(true)}
          />
        }>
        <View style={styles.container}>
          <Image
            alt="thumbnail"
            style={styles.image}
            source={{uri: item.thumbnailSrc}}
          />
          <View style={styles.textContainer}>
            <Heading size="2xl" color={'white'}>
              {item.name}
            </Heading>

            <View
              style={{
                flexDirection: 'row',
                marginTop: 15,
              }}>
              <Text bold fontSize={14} color="white">
                {item.category}
              </Text>
            </View>
            <View
              style={{
                marginRight: 'auto',
                marginTop: 6,
              }}>
              <RatingButton rating={item.avgRating} />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: 6,
              }}>
              <Icon
                name="location"
                size={14}
                color="#ff4500"
                style={{paddingTop: 3}}
              />
              <LocationName
                lat={item?.loc?.coordinates[1]}
                long={item?.loc?.coordinates[0]}
                value={locationName}
                setValue={setLocationName}
                textViewStyle={{}}
                textStyle={{paddingLeft: 7, fontSize: 14, color: 'white'}}
              />
            </View>

            {type === 'hotels' || type === 'nearbyHotels' ? (
              <View>
                <About
                  styleContainer={{paddingTop: 25}}
                  description={item.description}
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  descriptionStyle={{color: 'white'}}
                  seeStyle={{color: 'red'}}
                />

                <Location
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  lat={items.loc.coordinates[1]}
                  long={items.loc.coordinates[0]}
                  locationName={locationName}
                  locationNameStyle={{color: 'white'}}
                  navigationButtonStyle={{
                    backgroundColor: '#4169e1',
                    // borderColor: 'white',
                  }}
                  navigationButtonTextStyle={{color: '#fff'}}
                  iconColor={'#fff'}
                />
                <VendorDetails
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  vendorName={item.vendorName}
                  vendorEmail={item.vendorEmail}
                  vendorPhoneNumber={item.vendorPhoneNumber}
                  iconColor={'#fff'}
                  modalButtonStyle={{backgroundColor: '#4169e1'}}
                  modalButtonTextStyle={{color: '#fff'}}
                  nameTitleStyle={{color: '#fff'}}
                  vendorNameStyle={{color: '#fff'}}
                  emailTitleStyle={{color: '#fff'}}
                  vendorEmailStyle={{color: '#fff'}}
                  phoneNumTitleStyle={{color: '#fff'}}
                  vendorPhoneNumStyle={{color: '#fff'}}
                />
                <HomestayExpandableList
                  type={'House Rules'}
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  iconColor={'#fff'}>
                  <CheckInOut
                    checkInTime={items.checkInTime}
                    checkOutTime={items.checkOutTime}
                    additionalRules={items.additionalRules}
                    iconColor={'#fff'}
                    checkInTitleStyle={{color: 'white'}}
                    checkOutTitleStyle={{color: 'white'}}
                    additionalRulesTitleStyle={{color: 'white'}}
                    additionalRulesStyle={{color: 'white'}}
                  />
                </HomestayExpandableList>

                <HomestayExpandableList
                  type={'Parking'}
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  iconColor={'#fff'}>
                  <Parking
                    parkingNumber={item.parkingNumber}
                    parkingFee={item.parkingFee}
                    iconColor={'#fff'}
                    parkingNumStyle={{color: 'white'}}
                    parkingFeeStyle={{color: 'white'}}
                  />
                </HomestayExpandableList>
                <HomestayExpandableList
                  type={'Facilities & Amenities'}
                  subContainerView={{borderLeftColor: '#87cefa'}}
                  titleStyle={{color: 'white'}}
                  iconColor={'#fff'}>
                  <View style={{paddingLeft: 15}}>
                    <Facilities
                      facilities={facilities.general}
                      iconName="home"
                      title="General"
                      styleSubContent={{paddingTop: 25}}
                      iconColor={'#fff'}
                      valueStyle={{color: 'white'}}
                      titleStyle={{color: 'white'}}
                    />
                    <Facilities
                      facilities={facilities.services}
                      iconName="room-service"
                      title="Services"
                      iconColor={'#fff'}
                      valueStyle={{color: 'white'}}
                      titleStyle={{color: 'white'}}
                    />
                    <Facilities
                      facilities={facilities.outdoors}
                      iconName="flower"
                      title="Outdoor"
                      iconColor={'#fff'}
                      valueStyle={{color: 'white'}}
                      titleStyle={{color: 'white'}}
                    />

                    <Facilities
                      facilities={facilities.internet}
                      iconName="wifi"
                      title="Internet"
                      iconColor={'#fff'}
                      valueStyle={{color: 'white'}}
                      titleStyle={{color: 'white'}}
                    />
                  </View>
                </HomestayExpandableList>
                <CustomButton
                  colorScheme="secondary"
                  style={{marginTop: 20}}
                  onPress={() => {
                    navigation.navigate('SelectRoom', {
                      id,
                      item,
                      locationName,
                      facilities,
                      checkInDate,
                      checkOutDate,
                      totalDays,
                      adults,
                      children,
                      guests,
                    });
                  }}>
                  Select Rooms
                </CustomButton>
              </View>
            ) : (
              <View style={{marginTop: 20}}>
                <Text mt="3" mb="10" color={'white'}>
                  {item.description}
                </Text>
                <LocationButton
                  targetLat={item?.loc?.coordinates[1]}
                  targetLong={item?.loc?.coordinates[0]}
                />
              </View>
            )}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={() => handleLike()}
              style={{flexDirection: 'row'}}>
              <Image
                alt="like"
                style={styles.icon}
                source={require('../../assets/love.png')}
                tintColor={liked ? 'red' : 'gray'}
              />
              <Text
                ml={'2'}
                bold
                fontSize={12}
                color={liked ? 'red.500' : 'gray.500'}
                style={styles.iconText}>
                {likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{flexDirection: 'row'}}
              onPress={() =>
                navigation.navigate('SpotsComment', {
                  id: id,
                  type: type,
                })
              }>
              <Image
                style={styles.icon}
                alt="message"
                source={require('../../assets/message.png')}
                tintColor="red"
              />
              <Text
                ml={'2'}
                bold
                fontSize={12}
                color="red.500"
                style={styles.iconText}>
                {item.reviews ? item.reviews.length : 0}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleShare()}
              style={{flexDirection: 'row'}}>
              <Image
                style={styles.icon}
                source={require('../../assets/share.png')}
                alt="share"
                tintColor={shared ? 'red' : 'gray'}
              />
              <Text
                ml={'2'}
                bold
                fontSize={12}
                color={shared ? 'red.500' : 'gray.500'}
                style={styles.iconText}>
                {shares}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
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
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
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
