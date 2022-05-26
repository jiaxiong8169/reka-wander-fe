import {Button} from 'native-base';
import React from 'react';

export const CustomButton = ({
  onPress,
  children,
  colorScheme = 'primary',
  size = 'md',
  style,
  isDisabled = false,
  variant = 'solid',
}) => (
  <Button
    onPress={onPress}
    colorScheme={colorScheme}
    style={style}
    size={size}
    isDisabled={isDisabled}
    variant={variant}>
    {typeof children === 'string' ? children.toUpperCase() : children}
  </Button>
);
