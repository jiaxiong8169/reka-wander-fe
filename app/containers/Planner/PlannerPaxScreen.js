import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';
import SelectPax from '../../components/dropdown/Pax';
import Card from '../../components/card/card';

const PaxPage = ({navigation}) => {
  return (
    <View style={styles.body}>
      <Card
        style={{
          width: '100%',
        }}>
        <View style={styles.body_container}>
          <Text style={styles.question}>How many Pax?</Text>
          <SelectPax />

          <View style={{marginTop: 10}}>
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
            />
          </View>
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
    // marginBottom: '10%',
    marginBottom: 20,
    marginTop: 30,
    // marginHorizontal: '8%',
    width: '100%',
    // flex: 1,
    // backgroundColor: '#ffffff',
    // borderRadius: 20,
    // alignItems: 'center',
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
    // margin: 10,
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

export default PaxPage;
