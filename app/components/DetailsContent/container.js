import React, {useState, useEffect} from 'react';
import {Dimensions, View, StyleSheet, TouchableOpacity} from 'react-native';
import {CustomText} from '../texts/custom-text';

export const Container = props => {
  return (
    <View style={[styles.container, props.styleContainer]}>
      <View style={[ styles.subContainer, props.subContainerView,]}>
        <CustomText
          fontSize="2xl"
          style={[{lineHeight: 35, paddingLeft: 13}, props.titleStyle, ]}>
          {props.title}
        </CustomText>
      </View>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: 'grey',
    borderBottomWidth: 1,
    paddingBottom: 25,
    paddingTop: 25,
  },
  subContainer: {
    borderLeftColor: '#4169e1',
    borderLeftWidth: 5,
    borderRadius: 4,
  },
});
