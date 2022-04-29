import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Modal from 'react-native-modal';

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
          source={props.url}
        />
        <Text style={{flex: 7, fontSize: 15, color: '#000'}}>
          {props.title}
        </Text>
      </View>
      <View style={{padding: 3, flexDirection: 'row'}}>
        {props.children}

        <Text style={{flex: 2, fontSize: 14, paddingLeft: 5}}>
          {/* RM250/pax */}
        </Text>
        <TouchableOpacity
          style={{marginTop: 4}}
          onPress={() => setIsModelPopUp(true)}>
          <Text style={{fontSize: 10, color: '#00BFFF'}}>Edit</Text>
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
            {props.editPage}
          </Modal>
        </TouchableOpacity>
      </View>
    </View>
  );
}
