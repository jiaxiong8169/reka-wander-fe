import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import SelectPax from '../../components/dropdown/Pax';

const PaxPage = () => {
  
  return (
    <View style={styles.body_container}>
      <Text style={styles.question}>How many Pax?</Text>
      <SelectPax />

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
});

export default PaxPage;
