import React, { useState } from 'react';
import Modal from "react-native-modal";
import ModelContent from './ModalContent';

const Model = (props) => {
    const [isModalVisible, setModalVisible] = useState(true);
    const close = () => { setModalVisible(false) };
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
            <ModelContent
                title="Instructions"
                onPress={close}>
                {props.children}
            </ModelContent>
        </Modal>
    );
};


export default Model;