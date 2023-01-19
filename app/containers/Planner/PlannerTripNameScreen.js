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
      <Text style={styles.question}>Name Your Trip!</Text>
      <CustomTextInput
        // autoFocus={true}
        onChangeText={v => dispatch(setTripName(v))}
        placeholder="Type Your trip name here..."
        value={tripName}
      />
      <View style={{marginTop: 10}}>
        <Image
          source={require('../../assets/People.png')}
          style={{
            aspectRatio: 1,
            width: '80%',
            resizeMode: 'contain',
            height: undefined,
          }}
          alt="people"
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
    width: '100%',
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Baloo2-Bold',
    lineHeight: 24 * 1.4,
    height: 24,
    // fontFamily: 'sans-serif-medium',
    // fontWeight: 'bold',
    marginBottom: 20,
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
