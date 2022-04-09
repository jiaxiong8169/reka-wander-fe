import React from 'react';
import {StyleSheet, View, Text, ScrollView} from 'react-native';

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
    navigation.navigate('FinishPage');
  };

  const nextbuttonTextStyle = {
    backgroundColor: '#4169E1',
    minWidth: '35%',
    // height: "100%",
    borderRadius: 50,
    textAlign: 'center',
    color: 'white',
    padding: 12,
    marginHorizontal: 20,
  };

  const previousbuttonTextStyle = {
    backgroundColor: 'white',
    minWidth: '35%',
    // height: "100%",
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
                Melvin,
              </Text>
            </Text>
            <Text style={styles.subtitle}>Create your destiny</Text>
          </View>
          <View
            style={{
              paddingHorizontal: 20,
            }}>
            <ProgressSteps {...progressStepsStyle}>
              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
              >
                <TravelInterest quest="Travel interest" />
              </ProgressStep>
              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <PaxPage quest="How many Pax?" />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <ChooseDays quest="How many days?" />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <Withkids quest="With kids?" />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <RentHomeStay quest="Rent Homestay?" />
              </ProgressStep>

              <ProgressStep
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <RentCar quest="Rent Car?" />
              </ProgressStep>

              <ProgressStep
                onSubmit={onPressHandler}
                nextBtnTextStyle={nextbuttonTextStyle}
                previousBtnTextStyle={previousbuttonTextStyle}>
                <TravelBudget quest="Travel budget" />
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
    // padding: 20,
  },
  title: {
    fontWeight: '300',
    fontSize: 40,
    // marginHorizontal: 10,
    // marginTop: 10,
    color: `#4169E1`,
  },
  subtitle: {
    fontSize: 15,
    // marginLeft: 10,
    color: `#4169E1`,
  },
});
