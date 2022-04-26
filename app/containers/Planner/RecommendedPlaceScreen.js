import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';
import Modal from 'react-native-modal';
import TripName from './PlannerTripNameScreen';
import PaxPage from './PlannerPaxScreen';
import ChooseDays from './PlannerCalendarScreen';
import TravelBudget from './PlannertravelBudgetScreen';
import TravelInterest from './PlannerTravelinterestScreen';
import Withkids from './PlannerWithkidsScreen';
import RentHomeStay from './PlannerRentHomeStayScreen';
import RentCar from './PlannerRentCarScreen';
import {resetTrip} from '../../redux/Planner/actions';
import FastImage from 'react-native-fast-image';

export default function Recommended({navigation}) {
  const dispatch = useDispatch();
  const {tripName} = useSelector(state => state.plannerReducer);
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {budget} = useSelector(state => state.plannerReducer);
  const {interest} = useSelector(state => state.plannerReducer);
  const {kids} = useSelector(state => state.plannerReducer);
  const {rentHomeStay} = useSelector(state => state.plannerReducer);
  const {rentCar} = useSelector(state => state.plannerReducer);
  const {tripId} = useSelector(state => state.plannerReducer);
  const {tripPlan} = useSelector(state => state.plannerReducer);
  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  // end date is start date if empty
  const formattedEndDate = moment(endDate ? endDate : startDate).format(
    'YYYY-MM-DD',
  );
  const kid = kids == true ? 'Yes' : 'No';
  const rentHomeStays = rentHomeStay == true ? 'Yes' : 'No';
  const rentCars = rentCar == true ? 'Yes' : 'No';

  // add navigation listener to prevent back
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      console.log(e);
      if (
        e?.data?.action?.type === 'GO_BACK' &&
        e.target.includes('Recommended')
      )
        e.preventDefault();
    });
  }, [navigation]);

  useEffect(() => {
    console.log(tripPlan);
  }, [tripPlan]);

  const onPressHandler = () => {
    // clear trip fields
    dispatch(resetTrip());
    navigation.navigate('Success');
  };

  const [isNameModelPopUp, setIsNameModelPopUp] = useState(false);
  const closeNameModel = () => {
    setIsNameModelPopUp(false);
  };

  const [isPaxModalPopUp, setIsPaxModalPopUp] = useState(false);
  const closePaxModal = () => {
    setIsPaxModalPopUp(false);
  };

  const [isDateModalPopUp, setIsDateModalPopUp] = useState(false);
  const closeDateModal = () => {
    setIsDateModalPopUp(false);
  };

  const [isBudgetModalPopUp, setIsBudgetModalPopUp] = useState(false);
  const closeBudgetModal = () => {
    setIsBudgetModalPopUp(false);
  };

  const [isInterestModalPopUp, setIsInterestModalPopUp] = useState(false);
  const closeInterestModal = () => {
    setIsInterestModalPopUp(false);
  };

  const [isKidsModalPopUp, setIsKidsModalPopUp] = useState(false);
  const closeKidsModal = () => {
    setIsKidsModalPopUp(false);
  };

  const [isHomeStayModalPopUp, setIsHomeStayModalPopUp] = useState(false);
  const closeHomeStayModal = () => {
    setIsHomeStayModalPopUp(false);
  };

  const [isCarModalPopUp, setIsCarModalPopUp] = useState(false);
  const closeCarModal = () => {
    setIsCarModalPopUp(false);
  };

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{margin: 10}}>Your Searching Details</Text>
          <Card style={{marginVertical: 10}}>
            <View>
              <View
                style={{
                  flexDirection: 'column',
                  borderColor: '#000',
                  justifyContent: 'space-between',
                  borderBottomWidth: 1,
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    style={{flex: 1, height: undefined, resizeMode: 'contain'}}
                    source={require('../../assets/kid_icon.png')}
                  />
                  <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                    Trip Name
                  </Text>
                </View>
                <View style={{padding: 3, flexDirection: 'row'}}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {tripName ? tripName : 'My Trip'}
                  </Text>
                  <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                    {/* RM250/pax */}
                  </Text>
                  <TouchableOpacity
                    style={{marginTop: 4}}
                    onPress={() => setIsNameModelPopUp(true)}>
                    <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    <Modal
                      isVisible={isNameModelPopUp}
                      onBackdropPress={closeNameModel}
                      onSwipeComplete={closeNameModel}
                      useNativeDriverForBackdrop
                      swipeDirection={['left', 'right', 'up', 'down']}
                      animationIn="zoomInDown"
                      animationOut="zoomOutUp"
                      animationInTiming={700}
                      animationOutTiming={700}
                      backdropTransitionInTiming={700}
                      backdropTransitionOutTiming={700}>
                      <TripName />
                    </Modal>
                  </TouchableOpacity>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/pax_icon.png')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Pax
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                      {pax}
                    </Text>
                    <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                      {/* RM400/night */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsPaxModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isPaxModalPopUp}
                        onBackdropPress={closePaxModal}
                        onSwipeComplete={closePaxModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <PaxPage />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/calendar_icon.png')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Date
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                      {formattedStartDate} - {formattedEndDate}
                    </Text>
                    <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                      {/* RM400/night */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsDateModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isDateModalPopUp}
                        onBackdropPress={closeDateModal}
                        onSwipeComplete={closeDateModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <ChooseDays />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/travelInterest_icon.jpg')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Travel Interests
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <View style={{flex: 3, paddingLeft: 5}}>
                      {(!interest || interest.length === 0) && (
                        <View key={'Everything'}>
                          <Text style={{fontSize: 14}}>- Everything</Text>
                        </View>
                      )}
                      {interest.map(e => {
                        return (
                          <View key={e}>
                            <Text style={{fontSize: 14}}>- {e}</Text>
                          </View>
                        );
                      })}
                    </View>
                    <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                      {/* Depends */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsInterestModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isInterestModalPopUp}
                        onBackdropPress={closeInterestModal}
                        onSwipeComplete={closeInterestModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <TravelInterest />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/child_icon.jpg')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Kids
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 15,
                      }}>
                      {kid}
                    </Text>
                    <Text style={{flex: 2, fontSize: 15, paddingLeft: 5}}>
                      {/* Free */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsKidsModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isKidsModalPopUp}
                        onBackdropPress={closeKidsModal}
                        onSwipeComplete={closeKidsModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <Withkids />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View style={{flexDirection: 'column'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/Home.png')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Homestay
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 15,
                      }}>
                      {rentHomeStays}
                    </Text>
                    <Text style={{flex: 2, fontSize: 15, paddingLeft: 5}}>
                      {/* Free */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsHomeStayModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isHomeStayModalPopUp}
                        onBackdropPress={closeHomeStayModal}
                        onSwipeComplete={closeHomeStayModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <RentHomeStay />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/dollar_icon.png')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Budget
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                      RM{budget}
                    </Text>

                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsBudgetModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isBudgetModalPopUp}
                        onBackdropPress={closeBudgetModal}
                        onSwipeComplete={closeBudgetModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <TravelBudget />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{flexDirection: 'column', borderBottomColor: '#000'}}>
                <View
                  style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                  }}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={{
                        flex: 1,
                        height: undefined,
                        margin: 2,
                        resizeMode: 'contain',
                      }}
                      source={require('../../assets/car_icon.png')}
                    />
                    <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                      Car
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <Text
                      style={{
                        flex: 3,
                        paddingLeft: 5,
                        fontSize: 14,
                      }}>
                      {rentCars}
                    </Text>
                    <Text style={{flex: 2, fontSize: 15, paddingLeft: 5}}>
                      {/* Free */}
                    </Text>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() => setIsCarModalPopUp(true)}>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                      <Modal
                        isVisible={isCarModalPopUp}
                        onBackdropPress={closeCarModal}
                        onSwipeComplete={closeCarModal}
                        useNativeDriverForBackdrop
                        swipeDirection={['left', 'right', 'up', 'down']}
                        animationIn="zoomInDown"
                        animationOut="zoomOutUp"
                        animationInTiming={700}
                        animationOutTiming={700}
                        backdropTransitionInTiming={700}
                        backdropTransitionOutTiming={700}>
                        <RentCar />
                      </Modal>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Card>

          {tripPlan.hotelObject && (
            <View>
              <Text style={{margin: 10}}>Recommended Hotel</Text>
              <Card style={{marginVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={{margin: 4}}
                    onPress={() => {
                      navigation.navigate('SpotDetails', {
                        type: 'hotels',
                        id: item.id,
                      });
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderColor: '#000',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                      }}>
                      <FastImage
                        style={{
                          flex: 1,
                          height: 60,
                          resizeMode: 'contain',
                          borderRadius: 5,
                          paddingRight: 8,
                        }}
                        source={{uri: tripPlan.hotelObject.thumbnailSrc}}
                      />

                      <View
                        style={{
                          flex: 3,
                          flexDirection: 'column',
                          marginLeft: 3,
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                          }}>
                          {tripPlan.hotelObject.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#000',
                          }}>
                          {tripPlan?.hotelObject?.description
                            ? tripPlan.hotelObject.description.substring(
                                0,
                                100,
                              ) + '...'
                            : ''}
                        </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#000',
                            }}>
                            {tripPlan.hotelObject.perks}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{marginTop: 4}}
                    onPress={() =>
                      navigation.navigate('Edit', {
                        type: 'hotels',
                        fieldName: 'hotel',
                        fieldNameObj: 'hotelObject',
                      })
                    }>
                    <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          )}

          {tripPlan.homestayObject && (
            <View>
              <Text style={{margin: 10}}>Recommended Homestay</Text>
              <Card style={{marginVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={{margin: 4}}
                    onPress={() => {
                      navigation.navigate('SpotDetails', {
                        type: 'homestays',
                        id: tripPlan.homestayObject.id,
                      });
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderColor: '#000',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                      }}>
                      <FastImage
                        style={{
                          flex: 1,
                          height: 60,
                          resizeMode: 'contain',
                          borderRadius: 5,
                          paddingRight: 8,
                        }}
                        source={{uri: tripPlan.homestayObject.thumbnailSrc}}
                      />

                      <View
                        style={{
                          flex: 3,
                          flexDirection: 'column',
                          marginLeft: 3,
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                          }}>
                          {tripPlan.homestayObject.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#000',
                          }}>
                          {tripPlan?.homestayObject?.description
                            ? tripPlan.homestayObject.description.substring(
                                0,
                                100,
                              ) + '...'
                            : ''}
                        </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#000',
                            }}>
                            {tripPlan.homestayObject.perks}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{marginTop: 4}}
                    onPress={() =>
                      navigation.navigate('Edit', {
                        type: 'homestays',
                        fieldName: 'homestay',
                        fieldNameObj: 'homestayObject',
                      })
                    }>
                    <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          )}

          {tripPlan.vehicleObject && (
            <View>
              <Text style={{margin: 10}}>Recommended Car</Text>
              <Card style={{marginVertical: 10}}>
                <View style={{flexDirection: 'column'}}>
                  <TouchableOpacity
                    style={{margin: 4}}
                    onPress={() => {
                      navigation.navigate('SpotDetails', {
                        type: 'vehicles',
                        id: tripPlan.vehicleObject.id,
                      });
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        borderColor: '#000',
                        borderBottomWidth: 1,
                        paddingBottom: 10,
                      }}>
                      <FastImage
                        style={{
                          flex: 1,
                          height: 60,
                          resizeMode: 'contain',
                          borderRadius: 5,
                          paddingRight: 8,
                        }}
                        source={{uri: tripPlan.vehicleObject.thumbnailSrc}}
                      />

                      <View
                        style={{
                          flex: 3,
                          flexDirection: 'column',
                          marginLeft: 3,
                          paddingLeft: 10,
                        }}>
                        <Text
                          style={{
                            fontSize: 16,
                            color: '#000',
                          }}>
                          {tripPlan.vehicleObject.name}
                        </Text>
                        <Text
                          style={{
                            fontSize: 11,
                            color: '#000',
                          }}>
                          {tripPlan?.vehicleObject?.description
                            ? tripPlan.vehicleObject.description.substring(
                                0,
                                100,
                              ) + '...'
                            : ''}
                        </Text>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#000',
                            }}>
                            {tripPlan.vehicleObject.perks}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}>
                  <TouchableOpacity
                    style={{marginTop: 4}}
                    onPress={() =>
                      navigation.navigate('Edit', {
                        type: 'vehicles',
                        fieldName: 'vehicle',
                        fieldNameObj: 'vehicleObject',
                      })
                    }>
                    <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            </View>
          )}

          {tripPlan.attractionObjects && tripPlan.attractionObjects.length > 0 && (
            <View>
              <Text style={{margin: 10}}>Recommended Attractions</Text>
              {tripPlan.attractionObjects.map(item => (
                <Card style={{marginVertical: 10}} key={item.id}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity
                      style={{margin: 4}}
                      onPress={() => {
                        navigation.navigate('SpotDetails', {
                          type: 'attractions',
                          id: item.id,
                        });
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          borderColor: '#000',
                          borderBottomWidth: 1,
                          paddingBottom: 10,
                        }}>
                        <FastImage
                          style={{
                            flex: 1,
                            height: 60,
                            resizeMode: 'contain',
                            borderRadius: 5,
                            paddingRight: 8,
                          }}
                          source={{uri: item.thumbnailSrc}}
                        />

                        <View
                          style={{
                            flex: 3,
                            flexDirection: 'column',
                            marginLeft: 3,
                            paddingLeft: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#000',
                            }}>
                            {item.description.substring(0, 100) + '...'}
                          </Text>
                          <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#000',
                              }}>
                              {item.perks}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() =>
                        navigation.navigate('Edit', {
                          type: 'attractions',
                          fieldName: 'attractions',
                          fieldNameObj: 'attractionObjects',
                        })
                      }>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          )}

          {tripPlan.restaurantObjects && tripPlan.restaurantObjects.length > 0 && (
            <View>
              <Text style={{margin: 10}}>Recommended Restaurants</Text>
              {tripPlan.restaurantObjects.map(item => (
                <Card style={{marginVertical: 10}} key={item.id}>
                  <View style={{flexDirection: 'column'}}>
                    <TouchableOpacity
                      style={{margin: 4}}
                      onPress={() => {
                        navigation.navigate('SpotDetails', {
                          type: 'restaurants',
                          id: item.id,
                        });
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          borderColor: '#000',
                          borderBottomWidth: 1,
                          paddingBottom: 10,
                        }}>
                        <FastImage
                          style={{
                            flex: 1,
                            height: 60,
                            resizeMode: 'contain',
                            borderRadius: 5,
                            paddingRight: 8,
                          }}
                          source={{uri: item.thumbnailSrc}}
                        />

                        <View
                          style={{
                            flex: 3,
                            flexDirection: 'column',
                            marginLeft: 3,
                            paddingLeft: 10,
                          }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: '#000',
                            }}>
                            {item.name}
                          </Text>
                          <Text
                            style={{
                              fontSize: 11,
                              color: '#000',
                            }}>
                            {item.description.substring(0, 100) + '...'}
                          </Text>
                          <View
                            style={{
                              alignItems: 'flex-end',
                              justifyContent: 'flex-end',
                            }}>
                            <Text
                              style={{
                                fontSize: 11,
                                color: '#000',
                              }}>
                              {item.perks}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      justifyContent: 'flex-end',
                    }}>
                    <TouchableOpacity
                      style={{marginTop: 4}}
                      onPress={() =>
                        navigation.navigate('Edit', {
                          type: 'restaurants',
                          fieldName: 'restaurants',
                          fieldNameObj: 'restaurantObjects',
                        })
                      }>
                      <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
                    </TouchableOpacity>
                  </View>
                </Card>
              ))}
            </View>
          )}
        </View>
        {/* <View style={{flexDirection: 'row', marginTop: 20}}>
          <Text
            style={{
              flex: 1,
              fontSize: 16,
              marginLeft: 50,
              color: '#000',
            }}>
            Total Estimated Costs
          </Text>
          <Text style={{flex: 1, fontSize: 18, color: '#000'}}>
            RM {tripPlan.previousBudget - tripPlan.budget}
          </Text>
        </View> */}
        <View style={{marginTop: 20}}>
          <TouchableOpacity onPress={onPressHandler}>
            <Text
              style={{
                color: 'white',
                padding: 12,
                backgroundColor: '#4169E1',
                borderRadius: 50,
                textAlign: 'center',
                marginHorizontal: 80,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}
