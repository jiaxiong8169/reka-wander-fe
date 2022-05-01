import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';

const OneDigitInput = React.forwardRef(
  ({value, onChangeText, editable, onFocus, isFocus, backspaceAction}, ref) => {
    return (
      <View
        style={[
          styles.inputField,
          {borderColor: isFocus ? '#1933f7' : 'black'},
        ]}>
        <View
          style={{
            backgroundColor: 'rgba(255,255,255,0.3)',
            padding: 5,
            fontSize: 40,
          }}>
          <View>
            <TextInput
              value={value}
              textAlign="center"
              onChangeText={onChangeText}
              placeholder="*"
              editable={editable}
              maxLength={1}
              keyboardType={'number-pad'}
              caretHidden
              ref={ref}
              selection={{start: 1, end: 1}}
              onFocus={onFocus}
              onKeyPress={({nativeEvent}) => {
                console.log(nativeEvent.key);
                if (nativeEvent.key === 'Backspace' && value === '')
                  backspaceAction();
              }}
            />
          </View>
        </View>
      </View>
    );
  },
);

const OTPInput = ({setCode, editable}) => {
  const refInput0 = useRef();
  const refInput1 = useRef();
  const refInput2 = useRef();
  const refInput3 = useRef();
  const refInput4 = useRef();
  const refInput5 = useRef();

  const [state, setState] = useState(['', '', '', '', '', '']);
  const [isFocus, setIsFocus] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const codeOnChange = (text, index) => {
    const refArr = [
      refInput0,
      refInput1,
      refInput2,
      refInput3,
      refInput4,
      refInput5,
    ];

    setState(state => {
      const newState = [...state];
      newState[index] = text;
      return newState;
    });
    if (text !== '')
      if (index < refArr.length - 1) refArr[index + 1].current.focus();
      else refArr[index].current.blur();
  };

  useEffect(() => {
    console.log('run');
    setCode(state.join(''));
  }, [state]);

  const onBackspaceHandler = idx => {
    const refArr = [
      refInput0,
      refInput1,
      refInput2,
      refInput3,
      refInput4,
      refInput5,
    ];
    console.log(refArr[idx]);
    refArr[idx].current.focus();
    setState(state => state.map((val, index) => (index === idx ? '' : val)));
  };

  const focusOnCodeField = index => {
    setIsFocus(isFocus => isFocus.map((_, idx) => idx === index));
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: 3,
      }}>
      <OneDigitInput
        value={state[0]}
        onChangeText={e => codeOnChange(e, 0)}
        editable={editable}
        ref={refInput0}
        onFocus={() => focusOnCodeField(0)}
        isFocus={isFocus[0]}
        backspaceAction={() => {}}
      />
      <OneDigitInput
        value={state[1]}
        onChangeText={e => codeOnChange(e, 1)}
        editable={editable}
        ref={refInput1}
        onFocus={() => focusOnCodeField(1)}
        isFocus={isFocus[1]}
        backspaceAction={() => onBackspaceHandler(0)}
      />
      <OneDigitInput
        value={state[2]}
        onChangeText={e => codeOnChange(e, 2)}
        editable={editable}
        ref={refInput2}
        onFocus={() => focusOnCodeField(2)}
        isFocus={isFocus[2]}
        backspaceAction={() => onBackspaceHandler(1)}
      />
      <OneDigitInput
        value={state[3]}
        onChangeText={e => codeOnChange(e, 3)}
        editable={editable}
        ref={refInput3}
        onFocus={() => focusOnCodeField(3)}
        isFocus={isFocus[3]}
        backspaceAction={() => onBackspaceHandler(2)}
      />
      <OneDigitInput
        value={state[4]}
        onChangeText={e => codeOnChange(e, 4)}
        editable={editable}
        ref={refInput4}
        onFocus={() => focusOnCodeField(4)}
        isFocus={isFocus[4]}
        backspaceAction={() => onBackspaceHandler(3)}
      />
      <OneDigitInput
        value={state[5]}
        onChangeText={e => codeOnChange(e, 5)}
        editable={editable}
        ref={refInput5}
        onFocus={() => focusOnCodeField(5)}
        isFocus={isFocus[5]}
        backspaceAction={() => onBackspaceHandler(4)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 0,
    borderBottomWidth: 2,
    marginBottom: 15,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderColor: '#8c8c8c',
  },
});

export default OTPInput;
