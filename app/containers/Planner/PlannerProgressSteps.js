import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
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

export default function PlannerSteps({navigation}) {
  const onPressHandler = () => {
    navigation.navigate('Loading');
  };

  const nextbuttonTextStyle = {
    backgroundColor: '#4169E1',
    minWidth: '35%',
    borderRadius: 50,
    textAlign: 'center',
    color: 'white',
    padding: 12,
    marginHorizontal: 20,
  };

  const previousbuttonTextStyle = {
    backgroundColor: 'white',
    minWidth: '35%',
    borderRadius: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: '#4169E1',
    color: '#4169E1',
    textAlign: 'center',
    marginHorizontal: 20,
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
              <ProgressStep nextBtnTextStyle={nextbuttonTextStyle}>
                <TripName />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <PaxPage />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <ChooseDays />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <TravelInterest />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <Withkids />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <RentHomeStay />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <TravelBudget />
              </ProgressStep>

              <ProgressStep
                onSubmit={onPressHandler}
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <RentCar />
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
