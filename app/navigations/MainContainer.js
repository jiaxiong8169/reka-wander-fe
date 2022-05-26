import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import AndroidKeyboardAdjust from 'react-native-android-keyboard-adjust';

// Screens
import SpotsHomeScreen from '../containers/spots/SpotsHomeScreen';
import {SpotsListScreen} from '../containers/spots/SpotsListScreen';
import NearBySearchScreen from '../containers/spots/NearBySearchScreen';
import SpotDetailsScreen from '../containers/spots/SpotDetailsScreen';

//Planner
import PlannerStack from './PlannerNavigationFunction';
import SpotsImagesScreen from '../containers/spots/SpotsImagesScreen';
import SpotsCommentScreen from '../containers/spots/SpotsCommentScreen';
import {SearchScreen} from '../containers/spots/SearchScreen';
import {GuideStack} from './GuideStack';
import {ProfileStack} from './MenuStack';

//Screen names
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        name="SpotsList"
        component={SpotsListScreen}
        options={{
          headerShown: false,
        }}
        style={{height: 200}}
      />
      <Stack.Screen
        name="NearBySearch"
        component={NearBySearchScreen}
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
        name="SpotsImages"
        component={SpotsImagesScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SpotsSearchManually"
        component={SearchScreen}
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
    </Stack.Navigator>
  );
}

function MainContainer() {
  AndroidKeyboardAdjust.setAdjustNothing();

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
        tabBarStyle: {height: 60, paddingBottom: 10, paddingTop: 10},
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
        component={GuideStack}
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
        component={PlannerStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={ProfileStack}
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

export default MainContainer;
