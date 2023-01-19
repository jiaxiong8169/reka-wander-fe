import React, {useState} from 'react';
import Modal from 'react-native-modal';

const Model = props => {
  const [isModalVisible, setModalVisible] = useState(true);
  const close = () => {
    setModalVisible(false);
  };
  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={close}
      onSwipeComplete={close}
      useNativeDriverForBackdrop
      swipeDirection={['left', 'right', 'up', 'down']}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={700}
      animationOutTiming={700}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={700}>
      {props.children}
    </Modal>
  );
};

export default Model;
