import React, {useState} from 'react';
import {StyleSheet, View, Text, Image, TouchableOpacity} from 'react-native';

import Calendar from '../../components/CalenderPicker/CalenderPicker';
import Card from '../../components/card/card';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';

const ChooseDays = () => {
  const [isModalPopUp, setIsModalPopUp] = useState(false);
  const closeModal = () => {
    setIsModalPopUp(false);
  };

  return (
    <View style={styles.body}>
      <Card>
        <View>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.question}>How many days?</Text>
          </View>
          <Calendar />
        </View>

        <TouchableOpacity onPress={() => setIsModalPopUp(true)}>
          <Text style={{paddingTop: 15, color: 'blue'}}>
            Click me for Instructions
          </Text>
          <Modal
            isVisible={isModalPopUp}
            onBackdropPress={closeModal}
            onSwipeComplete={closeModal}
            useNativeDriverForBackdrop
            swipeDirection={['left', 'right', 'up', 'down']}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={700}
            animationOutTiming={700}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={700}>
            <ModelContent title="Instruction" onPress={closeModal} buttonTitle={'Close'}>
              <Image
                source={require('../../assets/calender.gif')}
                style={{width: 220, height: 200}}
              />
            </ModelContent>
          </Modal>
        </TouchableOpacity>
      </Card>
    </View>
  );
  // };
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
    flex: 1,
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ChooseDays;
