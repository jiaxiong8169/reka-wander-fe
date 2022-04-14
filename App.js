import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Router} from './app/navigations/Router';
import AuthProvider from './app/providers/AuthProvider';
import HttpProvider from './app/providers/HttpProvider';
import {persistor, store} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider>
          <AuthProvider>
            <HttpProvider>
              <Router />
            </HttpProvider>
          </AuthProvider>
        </NativeBaseProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
