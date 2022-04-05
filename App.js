import MainContainer from './app/navigations/MainContainer';
import { NativeBaseProvider, Box } from 'native-base';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PlannerSteps from './src/navigations/PlannerProgressSteps';
import HomePage from './src/navigations/PlannerHomeScreen';
import Loading from './src/navigations/PlannerLoadingScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

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
          component={PlannerSteps}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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

export default App;