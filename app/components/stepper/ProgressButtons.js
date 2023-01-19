import React from 'react';
import {View} from 'react-native';

const ProgressButtons = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 30,
    }}>
    {props.renderPreviousButton()}
    {props.renderNextButton()}
  </View>
);

export default ProgressButtons;
