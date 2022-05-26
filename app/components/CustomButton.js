import {Button} from 'native-base';
import React from 'react';

export const CustomButton = ({
  onPress,
  children,
  colorScheme = 'primary',
  size = 'md',
  style,
  isDisabled = false,
}) => (
  <Button
    onPress={onPress}
    colorScheme={colorScheme}
    style={style}
    size={size}
    isDisabled={isDisabled}>
    {typeof children === 'string' ? children.toUpperCase() : children}
  </Button>
);
