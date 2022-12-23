import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Counter from 'react-native-counters';
import {setPax} from '../../redux/Planner/actions';
import {useSelector, useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const SelectPax = () => {
  const dispatch = useDispatch();
  const {pax} = useSelector(state => state.plannerReducer);

  const plusIcon = isPlusDisabled => {
    return <Icon name="add" size={20} color={'#4169e1'} />;
  };

  const minusIcon = isDisabled => {
    return <Icon name="remove" size={20} color={'#4169e1'} />;
  };

  return (
    <View>
      {/* <Picker
        selectedValue={pax}
        onValueChange={value => dispatch(setPax(value))}
        mode="dialog" // Android only
        style={styles.picker}>
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
        <Picker.Item label="4" value="4" />
        <Picker.Item label="5" value="5" />
        <Picker.Item label="6" value="6" />
        <Picker.Item label="7" value="7" />
      </Picker> */}
      <Counter
        start={1}
        max={12}
        min={1}
        onChange={value => dispatch(setPax(value))}
        countTextStyle={{
          fontWeight: '500',
          color: '#4169e1',
        }}
        buttonStyle={{
          borderColor: '#4169e1',
          borderWidth: 2,
          // minWidth: 25,
          // minHeight: 25,
        }}
        buttonTextStyle={{margin: 0}}
        plusIcon={plusIcon}
        minusIcon={minusIcon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
  },
  picker: {
    alignContent: 'center',
    marginLeft: 60,
    width: 110,
    height: 30,
    borderWidth: 0.1,
    borderColor: '#000',
  },
});

export default SelectPax;
