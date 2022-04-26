import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import Interest from '../../components/dropdown/interest';
import Card from '../../components/card/card';

const TravelInterest = () => {
  return (
    <TouchableWithoutFeedback>
      <View style={styles.body}>
        <Card
          style={{
            width: '100%',
          }}>
          <View style={styles.body_container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.question}>Travel interest</Text>
            </View>
            <Interest />

            <View style={{marginTop: 10}}>
              <Image
                source={require('../../assets/Travel_interest.png')}
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
          </View>
        </Card>
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

export default TravelInterest;
