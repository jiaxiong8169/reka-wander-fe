import {NativeBaseProvider} from 'native-base';
import React from 'react';
import {Router} from './app/navigations/Router';
import AuthProvider from './app/providers/AuthProvider';
import HttpProvider from './app/providers/HttpProvider';
import {persistor, store} from './app/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {extendTheme} from 'native-base';
import { LogBox } from "react-native";

const theme = extendTheme({
  colors: {
    primary: {
      50: '#e5eeff',
      100: '#bbcbfa',
      200: '#90a8f1',
      300: '#6485e8',
      400: '#3963e0',
      500: '#1f49c6',
      600: '#16399b',
      700: '#0d2970',
      800: '#041846',
      900: '#00081d',
    },
    secondary: {
      50: '#ffeae3',
      100: '#f7c8bb',
      200: '#eca592',
      300: '#e38168',
      400: '#da5e3e',
      500: '#c14425',
      600: '#97341c',
      700: '#6d2413',
      800: '#431409',
      900: '#1d0300',
    },
  },
  components: {
    Button: {
      baseStyle: {
        rounded: 'lg',
      },
    },
    // Heading: {
    //   // Can pass also function, giving you access theming tools
    //   baseStyle: ({colorMode}) => {
    //     return {
    //       color: colorMode === 'dark' ? 'red.300' : 'blue.300',
    //       fontWeight: 'normal',
    //     };
    //   },
    // },
  },
});

LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NativeBaseProvider
          config={{
            dependencies: {
              'linear-gradient': LinearGradient,
            },
          }}
          theme={theme}>
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
