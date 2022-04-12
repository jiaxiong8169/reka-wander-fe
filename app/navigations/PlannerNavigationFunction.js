import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Planner
import HomePage from '../containers/Planner/PlannerHomeScreen';
import ChooseDays from '../containers/Planner/PlannerCalendarScreen';
import PlannerSteps from '../containers/Planner/PlannerProgressSteps';
import LoadingScreen from '../containers/Planner/PlannerLoadingScreen';
import Recommended from '../containers/Planner/RecommendedPlaceScreen';
import SuccessConfirmScreen from '../containers/Planner/PlannerSuccessCreateTrip';
import {Provider} from 'react-redux';
import {Store} from '../redux/Planner/store';

//Screen names
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function PlannerStack() {
  return (
    <Provider store={Store}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Calender"
          component={ChooseDays}
          options={{
            header: () => null,
          }}
        />

        <Stack.Screen
          name="Planner_Question"
          component={PlannerSteps}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Loading"
          component={LoadingScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessConfirmScreen}
          options={{
            header: () => null,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
