import React, {useState} from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Card from '../../components/card/card';
import RadioButtonRN from '../../components/multiple_choice/multiplechoice';
import {useSelector, useDispatch} from 'react-redux';
import {setRentCar} from '../../redux/Planner/actions';

const data = [
  {label: 'Yes', value: 'true', index: 1},
  {label: 'No', value: 'false', index: 2},
];

const RentCar = () => {
  const {rentCar} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  const onPressHandler = e => {
    if (e.value === 'true') {
      dispatch(setRentCar(true));
    } else {
      dispatch(setRentCar(false));
    }
  };

  return (
    <View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.question}>Rent Car?</Text>
      </View>
      <View style={{marginHorizontal: '15%'}}>
        <RadioButtonRN
          data={data}
          box={false}
          initial={rentCar ? 1 : 2}
          animationTypes={['pulse']}
          circleSize={18}
          textColor={'black'}
          selectedBtn={onPressHandler}></RadioButtonRN>
      </View>
      <View style={{marginTop: 10}}>
        <Image
          source={require('../../assets/kids.png')}
          style={{
            padding: 1,
            aspectRatio: 1,
            width: '100%',
            resizeMode: 'contain',
            alignItems: 'flex-end',
            height: undefined,
          }}
          alt="kids"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  body_container: {
    alignItems: 'center',
  },
  question: {
    alignItems: 'center',
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'red',
    width: 150,
    height: 40,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  next: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlignVertical: 'center',
  },
});

export default RentCar;
