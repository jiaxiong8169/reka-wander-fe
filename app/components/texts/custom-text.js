import {Text} from 'native-base';
import React from 'react';

export const CustomText = ({children, style}) => {
  return <Text style={style}>{children}</Text>;
};
