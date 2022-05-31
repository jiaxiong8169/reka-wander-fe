import {Text} from 'native-base';
import React from 'react';

export const CustomText = ({children, ...props}) => {
  return <Text {...props}>{children}</Text>;
};
