import {Input, Text, View} from 'native-base';
import React from 'react';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  startAdornment,
  endAdornment,
  fieldLabel,
  editable,
  style,
  ...props
}) => {
  return (
    <View style={style}>
      {fieldLabel && <Text mb={2}>{fieldLabel}</Text>}
      <Input
        variant="filled"
        shadow="3"
        mb={3}
        borderRadius="10"
        editable={editable}
        placeholder={placeholder}
        value={value}
        width="100%"
        onChangeText={onChangeText}
        InputLeftElement={startAdornment ? startAdornment : <></>}
        InputRightElement={endAdornment ? endAdornment : <></>}
        _focus={{
          backgroundColor: 'white',
        }}
        {...props}
      />
    </View>
  );
};

export default CustomTextInput;
