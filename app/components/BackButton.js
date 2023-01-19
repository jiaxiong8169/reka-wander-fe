import {ArrowBackIcon, Box} from 'native-base';
import React from 'react';
import {Pressable, StyleSheet} from 'react-native';

export const BackButton = ({navigation, absolute}) => {
  return (
    <Box style={absolute ? styles.backButtonAbsolute : styles.backButton}>
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowBackIcon size="8" color="coolGray.400" m="1" />
      </Pressable>
    </Box>
  );
};

const styles = StyleSheet.create({
  backButton: {
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 5,
    marginRight: 10,
  },
  backButtonAbsolute: {
    position: 'absolute',
    left: 20,
    top: 20,
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(69, 69 , 69, 0.7)',
    borderRadius: 5,
    zIndex: 100,
  },
});
