import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import PlannerStack from './PlannerStack';
import {GuideStack} from './GuideStack';
import {SettingsStack} from './SettingsStack';
import {SpotsStack} from './SpotsStack';

const Tab = createBottomTabNavigator();
const Temp = () => <GradientBackground />;

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
          } 
          // else if (rn === 'Store') {
          //   tabIconSource = 'store.png';
          //   iconName = 'store';
          // } 
          else if (rn === 'Settings') {
            tabIconSource = 'setting.png';
            iconName = 'setting';
          }
          //  else if (rn === 'Payment') {
          //   tabIconSource = 'payment.png';
          //   iconName = 'payment';
          // } else if (rn === 'News') {
          //   tabIconSource = 'news.png';
          //   iconName = 'news';
          // }
           else if (rn === 'Home') {
            tabIconSource = 'home.png';
            iconName = 'home';
          }

          var tabIcons = {
            'home.png': require('../assets/Home.png'),
            'agency.png': require('../assets/Agency.png'),
            // 'news.png': require('../assets/News.png'),
            // 'payment.png': require('../assets/Payment.png'),
            'setting.png': require('../assets/Setting.png'),
            'spots.png': require('../assets/Spots.png'),
            // 'store.png': require('../assets/Store.png'),
          };

          // You can return any component that you like here!
          return (
            <Image
              name={iconName}
              style={{width: 20, height: 20}}
              source={tabIcons[tabIconSource]}
              tintColor={color}
              alt="tab"
            />
          );
        },
        activeTintColor: '#0061FF',
        inactiveTintColor: 'grey',
        tabBarStyle: {height: 60, paddingBottom: 10, paddingTop: 10},
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name="Home"
        component={PlannerStack}
        options={{
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Spots"
        component={SpotsStack}
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
      {/* <Tab.Screen
        name="Store"
        component={Temp}
        options={{
          headerShown: false,
        }}
      /> */}
      
      <Tab.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          headerShown: false,
        }}
      />
      {/* <Tab.Screen
        name="Payment"
        component={Temp}
        options={{
          headerShown: false,
        }}
      /> */}
      {/* <Tab.Screen
        name="News"
        component={Temp}
        options={{
          headerShown: false,
        }}
      /> */}
    </Tab.Navigator>
  );
}

export default MainContainer;
