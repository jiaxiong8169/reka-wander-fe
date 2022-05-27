import React, {useState} from 'react';
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
import {PlannerSelectDestinationScreen} from './PlannerSelectDestinationScreen';

export default function PlannerSteps({navigation}) {
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const [errors, setErrors] = useState(false);
  const {budget} = useSelector(state => state.plannerReducer);

  const closeModel = () => {
    setIsModelPopUp(false);
  };

  const onPressHandler = () => {
    navigation.navigate('Loading');
  };

  const checkNumberInput = () => {
    try {
      //check for number input
      if (!budget || parseFloat(budget) < 100) {
        setIsModelPopUp(true);
        setErrors(true);
      } else {
        setErrors(false);
      }
    } catch (err) {
      console.log(err);
      setIsModelPopUp(true);
      setErrors(true);
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
    marginBottom: 10,
  };

  return (
    <GradientBackground>
      <ScrollView
        nestedScrollEnabled={true}
        contentContainerStyle={{flexGrow: 1}}
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>
              Hi{' '}
              <Text
                style={{
                  fontWeight: 'bold',
                  fontFamily: 'sans-serif-light',
                }}>
                Welcome,
              </Text>
            </Text>
            <Text style={styles.subtitle}>Create your destiny</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep>
                <InsertDetailsCard>
                  <TripName />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <PlannerSelectDestinationScreen />
                </InsertDetailsCard>
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
                  <Withkids />
                </InsertDetailsCard>
              </ProgressStep>

              <ProgressStep>
                <InsertDetailsCard>
                  <RentHomeStay />
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
                  <ModelContent onPress={closeModel} buttonTitle={'Close'}>
                    <Text style={{fontSize: 20, marginBottom: 12}}>Opps!</Text>
                    <Text>
                      Your travel budget must at least more than RM100! Please
                      re-enter your travel budget!
                    </Text>
                  </ModelContent>
                </Modal>
              </ProgressStep>

              <ProgressStep onSubmit={onPressHandler}>
                <InsertDetailsCard style={{width: '100%'}}>
                  <RentCar />
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
    flex: 1,
  },
  title: {
    fontWeight: '300',
    fontSize: 40,
    color: `#4169E1`,
  },
  subtitle: {
    fontSize: 15,
    color: `#4169E1`,
  },
});
