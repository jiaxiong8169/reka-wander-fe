import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {useAuth} from '../../hooks/useAuth';
// import {setTripName} from '../../redux/Planner/actions';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';
import {TripProgress} from '../../components/stepper/progressBar';
import GradientBackground from '../../components/GradientBackground';
import InsertDetailsCard from '../../components/stepper/InsertDetailsCard';
import {TripProgressStepIndicator} from '../../components/stepper/ProgressStepIndicator';

export const TripNameScreen = ({tripName, setTripName,isWarningModelPopUp, setIsWarningModelPopUp}) => {

  return (
        <View
          style={{
            justifyContent: 'center',
            alignContent: 'center',
          }}>
          {/* <TripProgress completion={'10%'} progress={progess} /> */}
          <InsertDetailsCard width={'85%'}>
            <View style={styles.body_container}>
              <Text style={styles.question}>Name Your Trip!</Text>
              <CustomTextInput
                onChangeText={v => setTripName(v)}
                placeholder="Type Your trip name here..."
                value={tripName}
              />
              <Image
                source={require('../../assets/People.png')}
                style={{
                  aspectRatio: 1,
                  width: '80%',
                  resizeMode: 'contain',
                  height: undefined,
                }}
                alt="people"
              />
            </View>
          </InsertDetailsCard>
          <Modal
            isVisible={isWarningModelPopUp}
            onBackdropPress={() => {
              setIsWarningModelPopUp(false);
            }}
            onSwipeComplete={() => {
              setIsWarningModelPopUp(false);
            }}
            useNativeDriverForBackdrop
            swipeDirection={['left', 'right', 'up', 'down']}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={700}
            animationOutTiming={700}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={700}>
            <ModelContent
              onPress={() => {
                setIsWarningModelPopUp(false);
              }}
              buttonTitle={'I Understand'}
              style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, marginBottom: 12}}>
                Visitor's trip plan will not be saved.
              </Text>
              <Text>
                We have detected that you entered as a visitor. Please take note
                that a visitor's trip plan will not be saved into the system. If
                you wish to save the trip plan, please sign up a Reka Wander
                account!
              </Text>
            </ModelContent>
          </Modal>
        </View>
    //   </ScrollView>
    // </GradientBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  body_container: {
    alignItems: 'center',
    // width: '100%',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Baloo2-Bold',
    // fontFamily: 'sans-serif-medium',
    // fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
  },
});
