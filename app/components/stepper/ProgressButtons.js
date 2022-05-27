import React from 'react';
import {View} from 'react-native';

const ProgressButtons = props => (
  <View
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
    {props.renderPreviousButton()}
    {props.renderNextButton()}
  </View>
);

export default ProgressButtons;
