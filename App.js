import * as React from 'react';
import MainContainer from './app/navigations/MainContainer';
import { NativeBaseProvider, Text, Box } from 'native-base';

function App() {
  return (
    <NativeBaseProvider>
      <MainContainer/>
    </NativeBaseProvider>
  );
}

export default App;