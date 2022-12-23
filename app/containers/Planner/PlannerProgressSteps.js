import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import Modal from 'react-native-modal';
import {useSelector} from 'react-redux';
import TripName from './PlannerTripNameScreen';
import PaxPage from './PlannerPaxScreen';
import ChooseDays from './PlannerCalendarScreen';
import TravelBudget from './PlannertravelBudgetScreen';
import TravelInterest from './PlannerTravelinterestScreen';
import Withkids from './PlannerWithkidsScreen';
import RentHomeStay from './PlannerRentHomeStayScreen';
import RentCar from './PlannerRentCarScreen';
import ProgressStep from '../../components/stepper/ProgressStep';
import ProgressSteps from '../../components/stepper/ProgressSteps';
import GradientBackground from '../../components/GradientBackground';
import ModelContent from '../../components/Modal/ModalContent';
import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';
import PlannerSelectDestinationScreen from './PlannerSelectDestinationScreen';
import {useAuth} from '../../hooks/useAuth';
import {TripNameScreen} from './PlannerTripName';

export default function PlannerSteps({navigation}) {
  const {authData} = useAuth();
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [isDistanceModelPopUp, setDistanceIsModelPopUp] = useState(false);
  const [isWarningModelPopUp, setIsWarningModelPopUp] = useState(false);
  const [errors, setErrors] = useState(false);
  const [errorsDistance, setErrorsDistance] = useState(false);
  const [tripName, setTripName] = useState('');
  const {
    accommodationBudget,
    restaurantBudget,
    vehicleBudget,
    attractionBudget,
    maxDistance,
    rentCar,
  } = useSelector(state => state.plannerReducer);

  useEffect(() => {
    if (!authData?.id) {
      setIsWarningModelPopUp(true);
    }
  }, [authData]);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const closeDistanceModel = () => {
    setDistanceIsModelPopUp(false);
  };

  const onPressHandler = () => {
    navigation.navigate('Loading');
  };

  const checkNumberInput = () => {
    try {
      // let totalBudget = parseFloat(accommodationBudget) + parseFloat(restaurantBudget) + parseFloat(vehicleBudget) + parseFloat(attractionBudget)
      //check for number input
      if (rentCar) {
        if (
          parseFloat(accommodationBudget) < 1000 ||
          parseFloat(restaurantBudget) < 1000 ||
          parseFloat(vehicleBudget) < 1000 ||
          parseFloat(attractionBudget) < 1000
        ) {
          setIsModelPopUp(true);
          setErrors(true);
        } else {
          setErrors(false);
          // navigation.navigate('Loading');
        }
      } else {
        if (
          parseFloat(accommodationBudget) < 1000 ||
          parseFloat(restaurantBudget) < 1000 ||
          parseFloat(attractionBudget) < 1000
        ) {
          setIsModelPopUp(true);
          setErrors(true);
        } else {
          setErrors(false);
          // navigation.navigate('Loading');
        }
      }
    } catch (err) {
      console.log(err);
      setIsModelPopUp(true);
      setErrors(true);
    }
  };

  const checkInput = () => {
    console.log('abc');
    try {
      //check for number input
      if (maxDistance < 50000) {
        console.log('abcd');
        setDistanceIsModelPopUp(true);
        setErrorsDistance(true);
      } else {
        console.log('abcde');
        setErrorsDistance(false);
      }
    } catch (err) {
      console.log(err);
      setDistanceIsModelPopUp(true);
      setErrorsDistance(true);
    }
  };

  const progressStepsStyle = {
    activeStepIconColor: '#ff4500',
    activeStepIconBorderColor: '#ff4500',

    completedProgressBarColor: '#ff4500',
    completeBorderColor: '#ff4500',
    completedStepIconColor: '#ff4500',

    progressBarColor: '#4169E1',
    disabledStepIconColor: '#4169E1',
    defaultBorderColor: '#4169E1',

    borderWidth: 3,
    activeStepNumColor: 'transparent',
    disabledStepNumColor: 'transparent',
    completedCheckColor: 'transparent',
    marginBottom: 0,
  };

  return (
    <GradientBackground>
      <ScrollView
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={{paddingTop: 4}}>
            <Text style={styles.title}>
              Hi{' '}
              <Text
                style={{
                  // fontWeight: 'bold',
                  // fontFamily: 'sans-serif-light',
                  lineHeight: 40 * 1.4,
                  // height: 0,
                  fontFamily: 'Baloo2-Bold',
                }}>
                Welcome,
              </Text>
            </Text>
            <Text style={styles.subtitle}>Create your destiny</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep>
                <InsertDetailsCard>
                  <TripName />
                  {/* <TripNameScreen
                  tripName={tripName}
                  setTripName={setTripName}
                  setIsWarningModelPopUp={setIsWarningModelPopUp}
                  isWarningModelPopUp={isWarningModelPopUp}
                /> */}
                </InsertDetailsCard>
                <Modal
                  isVisible={isWarningModelPopUp}
                  onBackdropPress={() => {
                    setIsWarningModelPopUp(false);
                  }}
                  onSwipeComplete={() => {
                    setIsWarningModelPopUp(false);
                  }}
                  useNativeDriverForBackdrop
                  swipeDirection={['left', 'right', 'up', 'down']}
                  animationIn="zoomInDown"
                  animationOut="zoomOutUp"
                  animationInTiming={700}
                  animationOutTiming={700}
                  backdropTransitionInTiming={700}
                  backdropTransitionOutTiming={700}>
                  <ModelContent
                    onPress={() => {
                      setIsWarningModelPopUp(false);
                    }}
                    buttonTitle={'I Understand'}>
                    <Text style={{fontSize: 20, marginBottom: 12}}>
                      Visitor's trip plan will not be saved.
                    </Text>
                    <Text>
                      We have detected that you entered as a visitor. Please
                      take note that a visitor's trip plan will not be saved
                      into the system. If you wish to save the trip plan, please
                      sign up a Reka Wander account!
                    </Text>
                  </ModelContent>
                </Modal>
              </ProgressStep>

              <ProgressStep
              // onNext={checkInput}
              // errors={errorsDistance}
              >
                <InsertDetailsCard>
                  <PlannerSelectDestinationScreen />
                </InsertDetailsCard>
                <Modal
                  isVisible={isDistanceModelPopUp}
                  onBackdropPress={closeDistanceModel}
                  onSwipeComplete={closeDistanceModel}
                  useNativeDriverForBackdrop
                  swipeDirection={['left', 'right', 'up', 'down']}
                  animationIn="zoomInDown"
                  animationOut="zoomOutUp"
                  animationInTiming={700}
                  animationOutTiming={700}
                  backdropTransitionInTiming={700}
                  backdropTransitionOutTiming={700}>
                  <ModelContent
                    onPress={closeDistanceModel}
                    buttonTitle={'Close'}>
                    <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
                    <Text>
                      Your maximum distance for recommendation must at least or
                      more than 50km! Please re-enter your maximum distance for
                      recommendation!
                    </Text>
                  </ModelContent>
                </Modal>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <PaxPage />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <ChooseDays />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <TravelInterest />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <RentHomeStay />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep
              // onSubmit={onPressHandler}
              >
                <InsertDetailsCard style={{width: '100%'}}>
                  <RentCar />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep onNext={checkNumberInput} errors={errors}>
                <InsertDetailsCard>
                  <TravelBudget />
                </InsertDetailsCard>
                <Modal
                  isVisible={isModelPopUp}
                  onBackdropPress={closeModel}
                  onSwipeComplete={closeModel}
                  useNativeDriverForBackdrop
                  swipeDirection={['left', 'right', 'up', 'down']}
                  animationIn="zoomInDown"
                  animationOut="zoomOutUp"
                  animationInTiming={700}
                  animationOutTiming={700}
                  backdropTransitionInTiming={700}
                  backdropTransitionOutTiming={700}>
                  <ModelContent
                    onPress={closeModel}
                    buttonTitle={'Close'}
                    style={{alignItems: 'center'}}>
                    <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
                    <Text style={{marginBottom: 12}}>
                      Your travel budget for{' '}
                      <Text style={{fontWeight: 'bold', color: '#000000'}}>
                        each section
                      </Text>{' '}
                      must at least or more than RM1000! Please re-enter your
                      travel budget!
                    </Text>
                  </ModelContent>
                </Modal>
              </ProgressStep>

              <ProgressStep onSubmit={onPressHandler}>
                <InsertDetailsCard>
                  <Withkids />
                </InsertDetailsCard>
              </ProgressStep>

            </ProgressSteps>
          </View>
        </View>
      </ScrollView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  title: {
    // fontWeight: '300',
    fontSize: 40,
    lineHeight: 40 * 1.4,
    height: 40,
    color: `#4169E1`,
    fontFamily: 'Quicksand-Bold',
  },
  subtitle: {
    fontSize: 15,
    color: `#4169E1`,
    // fontFamily: 'Quicksand-Medium',
  },
});
