import MainContainer from './app/navigations/MainContainer';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NativeBaseProvider>
       <MainContainer/>
    </NativeBaseProvider>
  )
};;

export default App;