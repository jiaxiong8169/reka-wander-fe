import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import SelectPax from '../component/dropdown/Pax';
import Card from '../component/card/card';

const PaxPage = (props) => {
  return (
    <View style={styles.body}>
      <Card>
        <View style={styles.body_container}>
          <Text style={styles.question}>
            {props.quest}
          </Text>
          <SelectPax />

          <View style={{ marginTop: 10 }}>
            <Image
              source={require('../assets/People.png')}
              style={{
                width: 260,
                resizeMode: 'contain',
                height: 200,
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
    // margin: 10,
  },
  body: {
    // marginBottom: '10%',
    margin: 10,
    marginHorizontal: '8%',
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
    textAlignVertical: 'center'
  },
});

export default PaxPage;