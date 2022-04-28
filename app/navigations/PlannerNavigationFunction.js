import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlannerSteps from '../containers/Planner/PlannerProgressSteps';
import LoadingScreen from '../containers/Planner/PlannerLoadingScreen';
import Recommended from '../containers/Planner/RecommendedPlaceScreen';
import SuccessConfirmScreen from '../containers/Planner/PlannerSuccessCreateTrip';
import SpotDetailsScreen from '../containers/spots/SpotDetailsScreen';
import RecommendedCard from '../containers/Planner/PlannerRecommendCard';
import {EditScreen} from '../containers/Planner/PlannerEditScreen';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../redux/store';
import {useHttpCall} from '../hooks/useHttpCall';
import {setInterests} from '../redux/Nearby/actions';
import {MyHomeScreen} from '../containers/home/MyHomeScreen';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';
import {CarRentalListScreen} from '../containers/carRental/CarRentalListScreen';
import {HomestayStack} from './HomestayStack';

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
          name="MyHome"
          component={MyHomeScreen}
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
        <Stack.Screen
          name="Edit"
          component={EditScreen}
          options={{
            header: () => null,
          }}
        />
        <Stack.Screen
          name="SpotDetails"
          component={SpotDetailsScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SpotsComment"
          component={SpotsCommentScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CarRentalList"
          component={CarRentalListScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Homestay"
          component={HomestayStack}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="RecommendedCards"
          component={RecommendedCard}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </Provider>
  );
}
