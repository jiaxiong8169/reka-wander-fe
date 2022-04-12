import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import Card from '../../components/card/card';
import GradientBackground from '../../components/GradientBackground';
import Modal from 'react-native-modal';
import PaxPage from './PlannerPaxScreen';
import ChooseDays from './PlannerCalendarScreen';
import TravelBudget from './PlannertravelBudgetScreen';
import TravelInterest from './PlannerTravelinterestScreen';
import Withkids from './PlannerWithkidsScreen';

export default function Recommended({navigation}) {
  const {startDate} = useSelector(state => state.plannerReducer);
  const {endDate} = useSelector(state => state.plannerReducer);
  const {pax} = useSelector(state => state.plannerReducer);
  const {budget} = useSelector(state => state.plannerReducer);
  const {interest} = useSelector(state => state.plannerReducer);
  const {kids} = useSelector(state => state.plannerReducer);
  const formattedStartDate = moment(startDate).format('YYYY-MM-DD');
  const formattedEndDate = moment(endDate).format('YYYY-MM-DD');
  const kid = kids == true ? 'Yes' : 'No';

  const onPressHandler = () => {
    navigation.navigate('Success');
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

  return (
    <GradientBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={{ margin: 10 }}>Your Searhing Details</Text>
          <Card style={{ marginVertical: 10 }}>
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
                    source={require('../../assets/pax_icon.png')}
                  />
                  <Text style={{flex: 7, fontSize: 16, color: '#000'}}>
                    Pax
                  </Text>
                </View>
                <View style={{padding: 3, flexDirection: 'row'}}>
                  <Text style={{flex: 3, paddingLeft: 5, fontSize: 14}}>
                    {pax}
                  </Text>
                  <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                    RM250/pax
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

              <View
                style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
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
                      RM400/night
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
                style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
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
                style={{ flexDirection: 'column', borderBottomColor: '#000' }}>
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
                      Travel Interest
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <View style={{flex: 3, paddingLeft: 5}}>
                      {interest.map(e => {
                        return (
                          <View key={e}>
                            <Text style={{fontSize: 14}}>- {e}</Text>
                          </View>
                        );
                      })}
                    </View>
                    <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
                      Depends
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
              <View style={{ flexDirection: 'column' }}>
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
                      source={require('../../assets/kid_icon.png')}
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
                      Free
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
              <View style={{flexDirection: 'row', marginTop: 20}}>
                <Text
                  style={{
                    flex: 1,
                    fontSize: 16,
                    marginLeft: 50,
                    color: '#000',
                  }}>
                  Total
                </Text>
                <Text style={{ flex: 1, fontSize: 18, color: '#000' }}>
                  RM2,600
                </Text>
              </View>
            </View>
          </Card>
          <Text style={{ margin: 10 }}>Recommended Spots</Text>
          <Card style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity style={{ margin: 4 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      height: 60,
                      resizeMode: 'contain',
                      borderRadius: 5,
                      paddingRight: 8,
                    }}
                    source={require('../../assets/home_2.jpg')}
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
                      Cock & Bull
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#000',
                      }}>
                      This is a small introduction about the spot
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
                        Free Entry
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#00BFFF',
                  paddingTop: 5,
                }}>
                Edit
              </Text>
            </View>
          </Card>

          <Text style={{ margin: 10 }}>Recommended Car</Text>
          <Card style={{ marginVertical: 10 }}>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity style={{ margin: 4 }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    borderColor: '#000',
                    borderBottomWidth: 1,
                    paddingBottom: 10,
                  }}>
                  <Image
                    style={{
                      flex: 1,
                      height: 60,
                      resizeMode: 'contain',
                      borderRadius: 5,
                      paddingRight: 8,
                    }}
                    source={require('../../assets/toyotaExample.png')}
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
                      Toyota
                    </Text>
                    <Text
                      style={{
                        fontSize: 11,
                        color: '#000',
                      }}>
                      This is a small introduction about the spot
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
                        4 seater
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
                paddingTop: 5,
              }}>
              <Text
                style={{
                  fontSize: 11,
                  color: '#00BFFF',
                }}>
                Edit
              </Text>
            </View>
          </Card>
        </View>
        <View style={{ marginTop: 20 }}>
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
