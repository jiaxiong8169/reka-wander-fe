import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomePage from '../containers/Planner/PlannerHomeScreen';
import ChooseDays from '../containers/Planner/PlannerCalendarScreen';
import PlannerSteps from '../containers/Planner/PlannerProgressSteps';
import LoadingScreen from '../containers/Planner/PlannerLoadingScreen';
import Recommended from '../containers/Planner/RecommendedPlaceScreen';
import SuccessConfirmScreen from '../containers/Planner/PlannerSuccessCreateTrip';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../redux/store';
import {useHttpCall} from '../hooks/useHttpCall';
import {setInterests} from '../redux/Nearby/actions';

//Screen names
const Stack = createStackNavigator();

export default function PlannerStack() {
  const {getWithoutAuth} = useHttpCall();
  const dispatch = useDispatch();

  // get interest in the stack
  React.useEffect(() => {
    getWithoutAuth('interests?sort=name').then(({data}) => {
      if (!!data) {
        // preprocess data to remove duplicates
        let visited = new Set();
        const result = [];
        data.forEach(d => {
          d.id = d.name;
          if (!visited.has(d.id)) {
            result.push(d);
            visited.add(d.id);
          }
        });
        dispatch(setInterests(result));
      }
    });
  }, []);

  return (
    <Provider store={store}>
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
