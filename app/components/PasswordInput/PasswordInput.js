import React, {useState} from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {Pressable, View, TextInput, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const PasswordInput = ({password, setPassword}) => {
  const [visible, setVisible] = useState(false);

  const handlePasswordVisible = () => {
    setVisible(visible => !visible);
  };

  return (
    <View style={styles.inputField}>
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
          placeholderTextColor="#a1a1a1"
          selectionColor={'black'}
          style={[{color: 'black', width: '85%'}]}
        />
        <Pressable
          onPress={handlePasswordVisible}
          style={{marginHorizontal: 11}}>
          <FontAwesomeIcon
            icon={visible ? faEye : faEyeSlash}
            size={27}
            style={{color: '#0891B2'}}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputField: {
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 10,
    borderColor: '#8c8c8c',
  },
});

export default PasswordInput;
