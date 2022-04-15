import React, {useEffect, useState} from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Pressable, View, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const PasswordInput = ({password, setPassword}) => {
  const [visible, setVisible] = useState(false);

  const handlePasswordVisible = () => {
    setVisible(visible => !visible);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: 'rgba(255,255,255,0.3)',
          padding: 5,
        },
      ]}>
      <TextInput
        textContentType="password"
        secureTextEntry={!visible}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="black"
        selectionColor={'black'}
        style={[styles.inputField, {color: 'black'}]}
      />
      <Pressable onPress={handlePasswordVisible}>
        <FontAwesomeIcon icon={visible ? faEye : faEyeSlash} size={22} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputField: {
    width: '90%',
  },
});

export default PasswordInput;
