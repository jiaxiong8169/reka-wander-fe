import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
// import Stepper from './src/component/stepper/step';

import HomePage from './src/navigations/PlannerHomeScreen';
import PaxPage from './src/navigations/PlannerPaxScreen';
import ChooseDays from './src/navigations/PlannerCalendarScreen';
import TravelBudget from './src/navigations/PlannertravelBudgetScreen';
import TravelInterest from './src/navigations/PlannerTravelinterestScreen';
import Withkids from './src/navigations/PlannerWithkidsScreen';
import RentHomeStay from './src/navigations/PlannerRentHomeStayScreen';
import RentCar from './src/navigations/PlannerRentCarScreen';
import Loading from './src/navigations/PlannerLoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Stepper from 'react-native-stepper-ui';
// import { TouchableOpacity } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const content = [
  <ChooseDays
    quest='How many days?'
  />,
  <Withkids
    quest='With kids?'
  />,
  <TravelInterest
    quest='Travel interest'
  />,

  <RentHomeStay
    quest='Rent Homestay?'
  />,
  <RentCar
    quest='Rent Car?'
  />,
  <PaxPage
    quest='How many Pax?'
  />,
  <TravelBudget
    quest='Travel budget'
  />,
];

function Finish() {
  return (
    <LinearGradient
      colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
      style={{ height: '100%', width: '100%' }}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Hi <Text style={{
            fontWeight: 'bold',
            fontFamily: 'sans-serif-light',
          }}>Melvin,</Text>
        </Text>
        <Text style={styles.subtitle}>
          Create your destiny
        </Text>
        <Loading
          quest='We are preparing your holiday.'
        />
      </View>
    </LinearGradient>
  )
};

function Home({ navigation }) {
  const onPressHandler = () => {
    navigation.navigate('Planner_Question');
  };
  return (
    <TouchableOpacity
      onPress={onPressHandler}
    >
      <HomePage />
    </TouchableOpacity>
  )
};

function Planner({ navigation }) {
  const [active, setActive] = useState(0);

  const onPressHandler = () => {
    navigation.navigate('FinishPage');
  };
  return (
    <LinearGradient
      colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
      style={{ height: '100%', width: '100%' }}>
      <ScrollView nestedScrollEnabled>
        <View style={styles.container}>
          <Text style={styles.title}>
            Hi <Text style={{
              fontWeight: 'bold',
              fontFamily: 'sans-serif-light',
            }}>Melvin,</Text>
          </Text>
          <Text style={styles.subtitle}>
            Create your destiny
          </Text>

          <Stepper
            active={active}
            content={content}
            onBack={() => setActive((p) => p - 1)}
            onNext={() => setActive((P) => P + 1)}
            onFinish={onPressHandler}
            wrapperStyle={{
              margin: 20,

            }}
            stepStyle={{
              backgroundColor: "#ff4500",
              width: 10,
              height: 10,
            }}
            stepTextStyle={{
              opacity: 0,
            }}
            buttonStyle={{
              // alignSelf: 'center',
              alignItems: 'center',
              // justifyContent: 'center',
              // marginBottom: 60,
              width: "35%",
              // height: 40,
              borderRadius: 50,
              backgroundColor: "#ff0000",
            }}
          >
          </Stepper>
        </View>
      </ScrollView>
    </LinearGradient>
  );

}

const App = () => {
  return (
    <NavigationContainer>


      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={Home}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Planner_Question"
          component={Planner}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="FinishPage"
          component={Finish}
          options={{
            header: () => null
          }}
        >

        </Stack.Screen>

      </Stack.Navigator>

    </NavigationContainer>
  )

  // const [active, setActive] = useState(0);

  // const onPressHandler = ({ navigation }) => {
  //   navigation.navigate('Finish');
  // };



  // const Stepper = {
  //   activeColor: '#00bfff',
  //   activeBorderColor: '#00bfff',
  //   completeColor: '#00bfff',
  //   completeBorderColor: '#00bfff',
  //   defaultColor: '#ff4500',
  //   defaultBorderColor: '#ff4500',
  //   steps: { step },
  //   size: 10,
  // };

  // const nextbuttonTextStyle = {
  //   backgroundColor: "#ff0000",
  //   width: 150,
  //   height: 50,
  //   borderRadius: 50,
  //   color: "white",
  //   padding: 12
  // };

  // const previousbuttonTextStyle = {
  //   backgroundColor: "white",
  //   padding: 10,
  //   borderWidth: 1,
  //   borderRadius: 12,
  //   borderColor: "#3584c5",
  //   color: "#3584c5"
  // };


  // return (

  //   <LinearGradient
  //     colors={['#CFDDFC', 'white', 'white', '#CFDDFC']}
  //     style={{ height: '100%', width: '100%' }}>

  //     <View style={styles.container}>
  //       <Text style={styles.title}>
  //         Hi <Text style={{
  //           fontWeight: 'bold',
  //           fontFamily: 'sans-serif-light',
  //         }}>Melvin,</Text>
  //       </Text>
  //       <Text style={styles.subtitle}>
  //         Create your destiny
  //       </Text>

  //       <Stepper
  //         active={active}
  //         content={content}
  //         onBack={() => setActive((p) => p - 1)}
  //         onNext={() => setActive((P) => P + 1)}
  //         onFinish={onPressHandler}
  //         wrapperStyle={{
  //           // height: '93%',
  //           margin: 10,
  //         }}
  //         stepStyle={{
  //           backgroundColor: "#ff4500",
  //           width: 15,
  //           height: 15,
  //         }}
  //         stepTextStyle={{
  //           opacity: 0,
  //         }}
  //         buttonStyle={{
  //           // alignSelf: 'center',
  //           // alignItems: 'center',
  //           // marginBottom: 60,
  //           backgroundColor: "#ff0000",
  //         }}
  //       >
  //       </Stepper>
  //     </View>

  //   </LinearGradient>
  // );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default App;