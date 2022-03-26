

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image} from 'react-native';

// Screens
import NearByCategoryScreen from '../containers/NearByCategoryScreen';
import NearBySearchScreen from '../containers/NearBySearchScreen';

//Screen names
const homeName = "Home";
const detailsName = "Details";
const settingsName = "Settings";

const Tab = createBottomTabNavigator();

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

        <Tab.Screen name='Spots' component={NearBySearchScreen} />
        <Tab.Screen name='Agency' component={NearByCategoryScreen} />
        <Tab.Screen name='Store' component={NearBySearchScreen} />
        <Tab.Screen name='Settings' component={NearBySearchScreen} />
        <Tab.Screen name='Payment' component={NearBySearchScreen} />
        <Tab.Screen name='News' component={NearBySearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default MainContainer;