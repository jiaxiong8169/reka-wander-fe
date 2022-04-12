import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useSelector, useDispatch} from 'react-redux';
import {setPax} from '../../redux/Planner/actions';

const SelectPax = () => {
  const {pax} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  // const [Pax, SetPax] = useState('1');

  return (
    <View>
      <Picker
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
      </Picker>
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
