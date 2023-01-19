import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
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
        {props.editPage ? (
          <TouchableOpacity
            style={{marginTop: 4}}
            onPress={() => setIsModelPopUp(true)}>
            <Text style={{fontSize: 14, color: '#6A5ACD'}}>Edit</Text>
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
      <Modal
        isVisible={isModelPopUp}
        onBackdropPress={closeModel}
        onSwipeComplete={closeModel}
        useNativeDriverForBackdrop
        // swipeDirection={['left', 'right']}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={700}
        animationOutTiming={700}
        backdropTransitionInTiming={700}
        backdropTransitionOutTiming={700}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <ModelContent
            style={{margin: 15, paddingTop: 35}}
            onPress={closeModel}>
            <View style={{marginBottom: 10}}>{props.editPage}</View>
          </ModelContent>
        </ScrollView>
        {/* </View> */}
      </Modal>
    </View>
  );
}
