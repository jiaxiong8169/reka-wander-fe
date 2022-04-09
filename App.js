import MainContainer from './app/navigations/MainContainer';
import { NativeBaseProvider } from 'native-base';
import React from 'react';
import { Router } from './app/navigations/Router';
import AuthProvider from './app/providers/AuthProvider';
import HttpProvider from './app/providers/HttpProvider';

const App = () => {
  return (
    <NativeBaseProvider>
      <AuthProvider>
        <HttpProvider>
          {/* <MainContainer /> */}
          <Router />
        </HttpProvider>
      </AuthProvider>
    </NativeBaseProvider>
  )
};

export default App;