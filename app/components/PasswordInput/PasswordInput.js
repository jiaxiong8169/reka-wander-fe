import React, {useState} from 'react';
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import {TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import CustomTextInput from '../CustomTextInput/CustomTextInput';

const PasswordInput = ({password, setPassword}) => {
  const [visible, setVisible] = useState(false);

  const handlePasswordVisible = () => {
    setVisible(visible => !visible);
  };

  return (
    <CustomTextInput
      type={visible ? 'text' : 'password'}
      value={password}
      onChangeText={setPassword}
      placeholder="Password"
      endAdornment={
        <TouchableOpacity onPress={handlePasswordVisible}>
          <FontAwesomeIcon
            icon={visible ? faEye : faEyeSlash}
            style={{color: 'rgba(0,0,0,0.3)', marginRight: 10}}
          />
        </TouchableOpacity>
      }
    />
  );
};

export default PasswordInput;
