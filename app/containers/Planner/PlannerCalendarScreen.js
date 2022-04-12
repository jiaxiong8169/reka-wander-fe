import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from 'react-native';

import Calendar from '../../components/CalenderPicker/CalenderPicker';
import Card from '../../components/card/card';

import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';

const ChooseDays = props => {
  const [isModalVisible, setModalVisible] = useState(true);
  const close = () => {
    setModalVisible(false);
  };

  const [isModalPopUp, setIsModalPopUp] = useState(false);
  const closeModal = () => {
    setIsModalPopUp(false);
  };

  return (
    <View style={styles.body}>
      <Card>
        <View style={styles.body_container}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.question}>{props.quest}</Text>
          </View>
          <Calendar />
          <Modal
            isVisible={isModalVisible}
            onBackdropPress={close}
            onSwipeComplete={close}
            useNativeDriverForBackdrop
            // backdropOpacity={0.2}
            swipeDirection={['left', 'right', 'up', 'down']}
            animationIn="zoomInDown"
            animationOut="zoomOutUp"
            animationInTiming={700}
            animationOutTiming={700}
            backdropTransitionInTiming={700}
            backdropTransitionOutTiming={700}>
            <ModelContent title="Please watch this instruction" onPress={close}>
              <Image
                source={require('../../assets/calender.gif')}
                style={{width: 220, height: 200}}
              />
            </ModelContent>
          </Modal>
        </View>
      </Card>
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
          <ModelContent title="Instruction" onPress={closeModal}>
            <Image
              source={require('../../assets/calender.gif')}
              style={{width: 220, height: 200}}
            />
          </ModelContent>
        </Modal>
      </TouchableOpacity>
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
    // marginHorizontal: 13,
    width: '100%',
  },
  body_container: {},
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  // button: {
  //     backgroundColor: 'red',
  //     width: 150,
  //     height: 40,
  //     borderRadius: 50,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  // },
  // next: {
  //     color: 'white',
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //     textAlignVertical: 'center'
  // },
});

export default ChooseDays;
