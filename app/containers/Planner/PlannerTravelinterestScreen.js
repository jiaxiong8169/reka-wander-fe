import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Interest from '../../components/dropdown/interest';

const TravelInterest = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.body_container}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.question}>Travel interest</Text>
        </View>
        <Interest />
        <View style={{marginTop: 10, alignItems: 'center'}}>
          <Image
            source={require('../../assets/Travel_interest.png')}
            style={{
              aspectRatio: 1,
              width: '80%',
              resizeMode: 'contain',
              height: undefined,
            }}
            alt="interests"
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  body_container: {},
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Baloo2-Bold',
    lineHeight: 24 * 1.4,
    height: 24,
    // fontFamily: 'sans-serif-medium',
    // fontWeight: 'bold',
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

export default TravelInterest;
