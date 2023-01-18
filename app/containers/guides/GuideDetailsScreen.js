import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  RefreshControl,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Heading, Text} from 'native-base';
import {ScrollView} from 'react-native';
import {CustomButton} from '../../components/CustomButton';
import {CustomText} from '../../components/texts/custom-text';
import {useHttpCall} from '../../hooks/useHttpCall';
import {useAuth} from '../../hooks/useAuth';
import {BackButton} from '../../components/BackButton';
import DeviceInfo from 'react-native-device-info';
import Share from 'react-native-share';
import {RatingButton} from '../../components/RatingButton';
import Icon from 'react-native-vector-icons/Ionicons';
import {LocationName} from '../../components/Location/LocationName';
import {Location} from '../../components/DetailsContent/Location';
import {About} from '../../components/DetailsContent/About';
import {LocationButton} from '../../components/Location/LocationButton';
import {VendorDetails} from '../../components/DetailsContent/VendorDetails';
import {Container} from '../../components/DetailsContent/container';
import {ContactModal} from '../../components/Contact/ContactModal';
import {HomestayExpandableList} from '../../components/ExpandableListView/HomestayContent';

const height = Dimensions.get('window').height;

export const GuideDetailsScreen = ({navigation, route}) => {
  const {authData} = useAuth();
  const {items, id, startDate, endDate, totalDays, guidePackage} = route.params;
  const {postWithAuth, getWithAuth} = useHttpCall();
  const [item, setItem] = React.useState({});
  const [reload, setReload] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [shared, setShared] = React.useState(false);
  const [likes, setLikes] = React.useState(0);
  const [shares, setShares] = React.useState(0);
  const [locationName, setLocationName] = useState('');
  const [isContactModelPopUp, setIsContactModelPopUp] = useState(false);

  function fetchData() {
    setLoading(true);
    // try to fetch the data
    getWithAuth(`guides/${id}`)
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
    console.log(id);
  }, [reload]);

  React.useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });
    return willFocusSubscription;
  }, []);

  const handleLike = async () => {
    if (loading) return; // do not proceed when loading is true
    // POST like API: Allow stale data to increase responsiveness
    try {
      postWithAuth(`guides/like`, {
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
    // open the share component
    try {
      await Share.open({
        title: `Reka Wander - ${item.name}`,
        url: item.link,
        message: `Please check out ${item.name} via:`,
      });
      // POST share API
      try {
        postWithAuth(`guides/share`, {
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

            {/* <Text fontSize={14} color="white">
              {item.city}
            </Text> */}
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text bold fontSize={14} color="white">
                {item.interest}
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
              lat={items?.loc?.coordinates[1]}
              long={items?.loc?.coordinates[0]}
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
            styleContainer={{borderBottomWidth:0,paddingBottom: 25,}}
              subContainerView={{borderLeftColor: '#87cefa',}}
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

            {/* <Container
              subContainerView={{borderLeftColor: '#87cefa'}}
              titleStyle={{color: '#fff'}}
              title={'Vendor Details'}>
              <View style={{flexDirection: 'column', paddingBottom: 20}}>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingTop: 18,
                    paddingBottom: 5,
                    alignItems: 'center',
                  }}>
                  <Icon name="person-outline" size={18} color={'#fff'} />
                  <CustomText
                    style={[
                      {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
                      {color: '#fff'},
                    ]}>
                    Name:
                  </CustomText>
                  <CustomText
                    style={[
                      {fontSize: 16, flex: 1, fontSize: 14},
                      {color: '#fff'},
                    ]}>
                    {item.vendorName}
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 8,
                    alignItems: 'center',
                  }}>
                  <Icon name="mail-outline" size={18} color={'#fff'} />
                  <CustomText
                    style={[
                      {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
                      {color: '#fff'},
                    ]}>
                    Email:
                  </CustomText>
                  <CustomText
                    style={[
                      {fontSize: 16, flex: 1, fontSize: 14},
                      {color: '#fff'},
                    ]}>
                    {item.vendorEmail}
                  </CustomText>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    paddingBottom: 8,
                    alignItems: 'center',
                  }}>
                  <Icon name="call-outline" size={18} color={'#fff'} />
                  <CustomText
                    style={[
                      {fontSize: 15, paddingHorizontal: 4, paddingRight: 7},
                      {color: '#fff'},
                    ]}>
                    Phone Number:
                  </CustomText>
                  <CustomText
                    style={[{flex: 1, fontSize: 14}, {color: '#fff'}]}>
                    {item.vendorPhoneNumber}
                  </CustomText>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  {
                    borderColor: '#4169e1',
                    borderWidth: 2,
                    height: 40,
                    borderRadius: 12,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  },
                  {backgroundColor: '#4169e1'},
                ]}
                onPress={() => {
                  setIsContactModelPopUp(current => !current);
                }}>
                <CustomText
                  style={[
                    {color: 'black', fontWeight: '400'},
                    {color: '#fff'},
                  ]}>
                  Contact Vendor
                </CustomText>
                <ContactModal
                  vendorEmail={item.vendorEmail}
                  vendorPhoneNumber={item.vendorPhoneNumber}
                  isContactModelPopUp={isContactModelPopUp}
                  setIsContactModelPopUp={setIsContactModelPopUp}
                />
              </TouchableOpacity>
            </Container> */}

            {/* <HomestayExpandableList
              type={'Packages'}
              subContainerView={{borderLeftColor: '#87cefa'}}
              titleStyle={{color: 'white'}}
              iconColor={'#fff'}> */}
            {/* {guidePackage.map(guidePack => {
              <View
                style={{
                  paddingTop: 15,
                }}>
                <View style={{flexDirection: 'column', marginLeft: 12}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 4,
                    }}>
                    <Icon name="flag" size={26} color={'#fff'} />
                    <CustomText ml="3" fontSize="14" style={{color: 'white'}}>
                      Package Name: {guidePack.name}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 4,
                    }}>
                    <Icon name="location" size={26} color={'#fff'} />
                    <CustomText ml="3" fontSize="14" style={{color: 'white'}}>
                      Location: {guidePack.location}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingBottom: 4,
                    }}>
                    <Icon name="time" size={26} color={'#fff'} />
                    <CustomText ml="3" fontSize="14" style={{color: 'white'}}>
                      Hours: {guidePack.hours}
                    </CustomText>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <Icon name="cash" size={27} color={'#fff'} />
                    <CustomText ml="3" fontSize="14" style={{color: 'white'}}>
                      Price: RM {guidePack.price}
                    </CustomText>
                  </View>
                </View>
              </View>;
            })} */}
            {/* </HomestayExpandableList> */}

            {/* <Text mt="3" mb="10" color={'white'}>
              {item.description}
            </Text> */}
            <CustomButton
              onPress={() => {
                navigation.navigate('PackageList', {
                  id:item.id,
                  item,
                  startDate,
                  endDate,
                  totalDays,
                });
              }}
              colorScheme="secondary">
              View Packages
            </CustomButton>
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
                  type: 'guides',
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
                tintColor={shared ? 'red' : 'gray'}
                alt="share"
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
};

const styles = StyleSheet.create({
  textContainer: {
    backgroundColor: '#414141',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'relative',
    right: 0,
    left: 0,
    top: -28,
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
