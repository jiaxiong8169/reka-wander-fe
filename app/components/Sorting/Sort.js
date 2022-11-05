import React, {useEffect, useState, useRef} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

export const Sort = ({
  setSorting,
  data,
  sorting,
  initial,
  setInitial,
}) => {
  useEffect(() => {
    data.map((v, i) => {
      if (sorting == v.value) setInitial(i);
    });
    console.log(sorting)
  }, [sorting]);
  return (
    <View
      style={{
        width: '100%',
        alignItems: 'center',
        paddingTop: 0,
      }}>
      <SwitchSelector
        initial={initial}
        onPress={value => {
          setSorting(value);
        }}
        value={sorting}
        textColor={'#4169e1'} //'#7a44cf'
        selectedColor={'#fff'}
        buttonColor={'#4169e1'}
        borderColor={'#4169e1'}
        options={data}
        valuePadding={0}
        height={35}
        animationDuration={200}
        // hasPadding
      />
    </View>
  );
};
