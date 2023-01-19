import React from 'react';
import {ActivityIndicator} from 'react-native';
import Modal from 'react-native-modal';

export const LoadingOverlay = () => {
  return (
    <Modal
      isVisible={true}
      onBackdropPress={() => {}}
      onSwipeComplete={() => {}}
      useNativeDriverForBackdrop
      swipeDirection={['left', 'right', 'up', 'down']}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={700}
      animationOutTiming={700}
      backdropTransitionInTiming={700}
      backdropTransitionOutTiming={700}>
      <ActivityIndicator size="large" />
    </Modal>
  );
};
