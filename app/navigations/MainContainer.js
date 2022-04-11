import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image, StyleSheet} from 'react-native';
import GradientBackground from '../components/GradientBackground';

// Screens
import SpotsHomeScreen from '../containers/spots/SpotsHomeScreen';
import SpotsCategoryScreen from '../containers/spots/SpotsCategoryScreen';
import NearByHomeScreen from '../containers/spots/nearby/NearByHomeScreen';
import NearByCategoryScreen from '../containers/spots/nearby/NearByCategoryScreen';
import NearBySearchScreen from '../containers/spots/nearby/NearBySearchScreen';
import NearByDetailsScreen from '../containers/spots/nearby/NearByDetailsScreen';
//Planner
import HomePage from '../containers/Planner/PlannerHomeScreen';
import PlannerSteps from '../containers/Planner/PlannerProgressSteps';
import LoadingScreen from '../containers/Planner/PlannerLoadingScreen';
import Recommended from '../containers/Planner/RecommendedPlaceScreen';
import SuccessConfirmScreen from '../containers/Planner/PlannerSuccessCreateTrip';
import { Provider } from 'react-redux';
import { Store } from '../redux/Planner/store';

import BlueSubtitle from '../components/BlueSubtitle';
import { SettingsScreen } from '../containers/settings';

//Screen names
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

//temporary
const Temp = () => <GradientBackground></GradientBackground>;

function SpotsHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpotsHome"
        component={SpotsHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsCategory"
        component={SpotsCategoryScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NearByHome"
        component={NearByHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NearBySearch"
        component={NearBySearchScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NearByDetails"
        component={NearByDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="NearByCategory"
        component={NearByCategoryScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

function PlannerHomeStack() {
  return (
    <Provider store={Store}>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
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
          name="Loading"
          component={LoadingScreen}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Recommended"
          component={Recommended}
          options={{
            header: () => null
          }}
        />
        <Stack.Screen
          name="Success"
          component={SuccessConfirmScreen}
          options={{
            header: () => null
          }}
        />


      </Stack.Navigator>
    </Provider>
  );
}

function MainContainer() {
  return (
    <Tab.Navigator
      initialRouteName={'Home'}
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let tabIconSource;
          let iconName;
          let rn = route.name;

          if (rn === 'Spots') {
            tabIconSource = 'spots.png';
            iconName = 'spots';
          } else if (rn === 'Agency') {
            tabIconSource = 'agency.png';
            iconName = 'agency';
          } else if (rn === 'Store') {
            tabIconSource = 'store.png';
            iconName = 'store';
          } else if (rn === 'Settings') {
            tabIconSource = 'setting.png';
            iconName = 'setting';
          } else if (rn === 'Payment') {
            tabIconSource = 'payment.png';
            iconName = 'payment';
          } else if (rn === 'News') {
            tabIconSource = 'news.png';
            iconName = 'news';
          } else if (rn === 'Home') {
            tabIconSource = 'home.png';
            iconName = 'home';
          }

          var tabIcons = {
            'agency.png': require('../assets/Agency.png'),
            'news.png': require('../assets/News.png'),
            'payment.png': require('../assets/Payment.png'),
            'home.png': require('../assets/Home.png'),
            'setting.png': require('../assets/Setting.png'),
            'spots.png': require('../assets/Spots.png'),
            'store.png': require('../assets/Store.png'),
          };

          // You can return any component that you like here!
          return (
            <Image
              name={iconName}
              style={{width: 20, height: 20}}
              source={tabIcons[tabIconSource]}
              tintColor={color}
            />
          );
        },
        activeTintColor: '#0061FF',
        inactiveTintColor: 'grey',
        labelStyle: {paddingBottom: 10, fontSize: 10},
        style: {padding: 20, height: 100},
      })}>
      <Tab.Screen
        name="Spots"
        component={SpotsHomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Agency"
        component={Temp}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Store"
        component={Temp}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Home"
        component={PlannerHomeStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Payment"
        component={Temp}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="News"
        component={Temp}
        options={{
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

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

export default MainContainer;
