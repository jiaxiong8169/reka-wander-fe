import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import PlannerSteps from '../containers/Planner/PlannerProgressSteps';
import LoadingScreen from '../containers/Planner/PlannerLoadingScreen';
import Recommended from '../containers/Planner/RecommendedPlaceScreen';
import SuccessConfirmScreen from '../containers/Planner/PlannerSuccessCreateTrip';
import SpotDetailsScreen from '../containers/spots/SpotDetailsScreen';
import {EditScreen} from '../containers/Planner/PlannerEditScreen';
import {Provider, useDispatch} from 'react-redux';
import {store} from '../redux/store';
import {useHttpCall} from '../hooks/useHttpCall';
import {setInterests} from '../redux/Nearby/actions';
import {MyHomeScreen} from '../containers/home/MyHomeScreen';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';
import UserCarRentalInfo from '../containers/carRental/CarRentalUserInfo';
import {SpotsListScreen} from '../containers/spots/SpotsListScreen';
import {HomestayListScreen} from '../containers/homestays/HomestayListScreen';
import {HomestayDetailsScreen} from '../containers/homestays/HomestayDetailsScreen';
import {HomestaySelectRoomScreen} from '../containers/homestays/HomestaySelectRoomScreen';
import {HomestayRentScreen} from '../containers/homestays/HomestayRentScreen';
import {PlannerHistory} from '../containers/Planner/PlannerHistory';
import {TripHistoryDetails} from '../containers/Planner/TripHistoryDetails';
import {CarRentalListScreen} from '../containers/carRental/CarRentalListScreen';
import {CarRentalDetailsScreen} from '../containers/carRental/CarRentalDetailsScreen';
import {SelectRoomScreen} from '../containers/spots/SelectRoomScreen';
import {HotelConfirmationScreen} from '../containers/spots/HotelConfirmationScreen';

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

        <Stack.Group>
          <Stack.Screen
            name="PlannerSteps"
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
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="Edit"
            component={EditScreen}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="SpotsList"
            component={SpotsListScreen}
            options={{
              headerShown: false,
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
            name="SelectRoom"
            component={SelectRoomScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="HotelConfirmation"
            component={HotelConfirmationScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="HomestayEdit"
            component={HomestayListScreen}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="HomestayDetails"
            component={HomestayDetailsScreen}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="HomestaySelectRoom"
            component={HomestaySelectRoomScreen}
            options={{
              header: () => null,
            }}
          />
          <Stack.Screen
            name="HomestayRent"
            component={HomestayRentScreen}
            options={{
              header: () => null,
            }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="MyTripHistory"
            component={PlannerHistory}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="TripHistoryDetails"
            component={TripHistoryDetails}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>

        <Stack.Group>
          <Stack.Screen
            name="CarRentalList"
            component={CarRentalListScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CarRentalDetails"
            component={CarRentalDetailsScreen}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="CarRentalUserInfo"
            component={UserCarRentalInfo}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Group>
      </Stack.Navigator>
    </Provider>
  );
}
