import React from 'react';
import {StyleSheet, View, TextInput, Text} from 'react-native';

const CustomTextInput = ({
  placeholder,
  value,
  onChangeText,
  startAdornment,
  ...props
}) => {
  return (
    <View style={styles.inputField}>
      <View
        style={{
          backgroundColor: 'rgba(255,255,255,0.3)',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        {startAdornment && (
          <View
            style={[
              styles.inputAddOn,
              {
                height: '100%',
                justifyContent: 'center',
                paddingHorizontal: 8,
              },
            ]}>
            <Text>{startAdornment}</Text>
          </View>
        )}
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#a1a1a1"
          selectionColor={'black'}
          style={{color: 'black', width: '100%', margin: 5}}
          {...props}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: '#8c8c8c',
  },
  inputAddOn: {
    backgroundColor: '#aeb3bd',
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
});

export default CustomTextInput;
