import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

// Screens
import SpotsHomeScreen from '../containers/spots/SpotsHomeScreen';
import NearByHomeScreen from '../containers/spots/nearby/NearByHomeScreen';
import NearByCategoryScreen from '../containers/spots/nearby/NearByCategoryScreen';
import NearBySearchScreen from '../containers/spots/nearby/NearBySearchScreen';
import NearByDetailsScreen from '../containers/spots/nearby/NearByDetailsScreen';
//Screen names
const homeName = "Home";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function SpotsHomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SpotsHome"
        component={SpotsHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NearByHome"
        component={NearByHomeScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NearBySearch"
        component={NearBySearchScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NearByDetails"
        component={NearByDetailsScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="NearByCategory"
        component={NearByCategoryScreen}
        options={{
          headerShown: false
        }}
      />
      
    </Stack.Navigator>
  );
}

function MainContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName={homeName}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let tabIconSource;
            let iconName;
            let rn = route.name;

            if (rn === 'Spots') {
              tabIconSource="spots.png";
              iconName = 'spots';
            }else if(rn === 'Agency'){
              tabIconSource="agency.png";
              iconName = 'agency';
            }else if(rn === 'Store'){
              tabIconSource="store.png";
              iconName = 'store';
            }else if(rn === 'Settings'){
              tabIconSource="setting.png";
              iconName = 'setting';
            }else if(rn === 'Payment'){
              tabIconSource="payment.png";
              iconName = 'payment';
            }else if(rn === 'News'){
              tabIconSource="news.png";
              iconName = 'news';
            }

            var tabIcons = {
                            'agency.png' : require('../assets/Agency.png'),
                            'news.png': require('../assets/News.png'),
                            'payment.png': require('../assets/Payment.png'),
                            'setting.png': require('../assets/Setting.png'),
                            'spots.png': require('../assets/Spots.png'),
                            'store.png': require('../assets/Store.png'),
                          }
                      

            // You can return any component that you like here!
            return <Image
            name={iconName} style={{ width: 20, height: 20 }}
            source = {tabIcons[tabIconSource]}
            tintColor={color}/>
          },
        })}
        tabBarOptions={{
          activeTintColor: '#0061FF',
          inactiveTintColor: 'grey',
          labelStyle: { paddingBottom: 10, fontSize: 10 },
          style: { padding: 10, height: 70}
        }}>

        {/* <Tab.Screen name='Spots' component={NearBySearchScreen} /> */}
        <Tab.Screen
          name="Spots"
          component={SpotsHomeStack}
          // options={{
          //   tabBarLabel: 'Spots',
          // }}
        />
        <Tab.Screen name='Agency' component={NearByCategoryScreen} />
        <Tab.Screen name='Store' component={NearBySearchScreen} />
        <Tab.Screen name='Settings' component={NearByHomeScreen} />
        <Tab.Screen name='Payment' component={NearBySearchScreen} />
        <Tab.Screen name='News' component={NearBySearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;