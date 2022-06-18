import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import CustomTextInput from '../../components/CustomTextInput/CustomTextInput';
import {setTripName} from '../../redux/Planner/actions';

const TripName = () => {
  const {tripName} = useSelector(state => state.plannerReducer);
  const dispatch = useDispatch();

  return (
    <View style={styles.body_container}>
      <Text style={styles.question}>Give Your Trip a name!</Text>
      <CustomTextInput
        autoFocus={true}
        onChangeText={v => dispatch(setTripName(v))}
        placeholder="Type Your trip name here..."
        value={tripName}
      />
      <Image
        source={require('../../assets/People.png')}
        style={{
          padding: 1,
          aspectRatio: 1,
          width: '100%',
          resizeMode: 'contain',
          alignItems: 'flex-end',
          height: undefined,
        }}
        alt="people"
      />
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
    width: '100%',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
    marginBottom: 10,
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

export default TripName;
