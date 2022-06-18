import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';
import ModelContent from '../../components/Modal/ModalContent';

export default function UserDetails(props) {
  const [isModelPopUp, setIsModelPopUp] = useState(false);
  const closeModel = () => {
    setIsModelPopUp(false);
  };
  return (
    <View
      style={[
        {
          flexDirection: 'column',
          borderColor: '#000',
          justifyContent: 'space-between',
          borderBottomWidth: 1,
        },
        props.styles,
      ]}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={[
            {flex: 1, height: undefined, resizeMode: 'contain'},
            props.imageStyle,
          ]}
          alt="url"
          source={props.url}
        />
        <Text style={{flex: 7, fontSize: 15, color: '#000'}}>
          {props.title}
        </Text>
      </View>
      <View style={{padding: 3, flexDirection: 'row'}}>
        {props.children}
        {!props.noEdit && (
          <TouchableOpacity
            style={{marginTop: 4}}
            onPress={() => setIsModelPopUp(true)}>
            <Text style={{fontSize: 14, color: '#6A5ACD'}}>Edit</Text>
            <Modal
              isVisible={isModelPopUp}
              onBackdropPress={closeModel}
              onSwipeComplete={closeModel}
              useNativeDriverForBackdrop
              swipeDirection={['left', 'right', 'up', 'down']}
              animationIn="zoomInDown"
              animationOut="zoomOutUp"
              animationInTiming={700}
              animationOutTiming={700}
              backdropTransitionInTiming={700}
              backdropTransitionOutTiming={700}>
              <ModelContent onPress={closeModel}>{props.editPage}</ModelContent>
            </Modal>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
