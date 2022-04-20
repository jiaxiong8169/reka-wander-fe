import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import Card from '../../components/card/card';
import RadioButtonRN from '../../components/multiple_choice/multiplechoice';
import {useSelector, useDispatch} from 'react-redux';
import {setKids} from '../../redux/Planner/actions';

const data = [
  {label: 'Yes', value: 'true', index: 1},
  {label: 'No', value: 'false', index: 2},
];

const Withkids = () => {
  const {kids} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  const onPressHandler = e => {
    if (e.value === 'true') {
      dispatch(setKids(true));
    } else {
      dispatch(setKids(false));
    }
  };

  return (
    <View style={styles.body}>
      <Card style={{width: '100%'}}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.question}>With kids?</Text>
        </View>
        <View style={{marginHorizontal: '15%'}}>
          <RadioButtonRN
            data={data}
            box={false}
            initial={kids ? 1 : 2}
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
          />
        </View>
      </Card>
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

export default Withkids;
