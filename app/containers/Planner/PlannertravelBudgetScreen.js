import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, Image, Alert} from 'react-native';
import Card from '../../components/card/card';
import {useSelector, useDispatch} from 'react-redux';
import {setBudget} from '../../redux/Planner/actions';

const TravelBudget = () => {
  const {budget} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  return (

      <View style={styles.body_container}>
        <Text style={styles.question}>Travel budget</Text>
        <TextInput
          style={styles.input}
          keyboardType={'number-pad'}
          onChangeText={v => {
            dispatch(setBudget(v));
          }}
          placeholder="RM..."
          value={budget}
        />
        <View style={{marginTop: 10}}>
          <Image
            source={require('../../assets/budget.png')}
            style={{
              padding: 1,
              aspectRatio: 1,
              width: '100%',
              resizeMode: 'contain',
              // justifyContent: 'flex-end',
              alignItems: 'flex-end',
              height: undefined,
            }}
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
  input: {
    width: '100%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#ccc',
  },
});

export default TravelBudget;
