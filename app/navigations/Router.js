import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useAuth} from '../hooks/useAuth';
import {Text, Modal, View, StyleSheet} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../containers/auth/SignInScreen';
import {ConfirmPhoneScreen} from '../containers/auth/ConfirmPhoneScreen';
import MainContainer from './MainContainer';

const Stack = createNativeStackNavigator();

export const Router = () => {
  const {loading, authError} = useAuth();
  const [setModalVisible] = useState(false);
  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name="Main Screens"
            component={MainContainer}
          />
        </Stack.Group>
        <Stack.Group screenOptions={{presentation: 'modal'}}>
          <Stack.Screen
            options={{headerShown: false}}
            name="Sign In Screen"
            component={SignInScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Confirm Phone"
            component={ConfirmPhoneScreen}
          />
        </Stack.Group>
      </Stack.Navigator>
      <Modal
        animationType="slide"
        transparent
        visible={!!authError}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{authError}</Text>
        </View>
      </Modal>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-end',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    color: 'white',
  },
});
