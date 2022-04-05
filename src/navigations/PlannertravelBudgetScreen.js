import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import SelectBudget from '../component/dropdown/budget';
import Card from '../component/card/card';

const TravelBudget = (props) => {
  return (
    <View style={styles.body}>
      <Card style={{ width: '100%' }}>
        <View style={styles.body_container}>
          <Text style={styles.question}>
            {props.quest}
          </Text>
          <SelectBudget />
          <View style={{ marginTop: 10 }}>
            <Image
              source={require('../assets/budget.png')}
              style={{
                padding: 1,
                aspectRatio: 1,
                width: '100%',
                resizeMode: 'contain',
                // justifyContent: 'flex-end',
                alignItems: 'flex-end',
                height: undefined
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
    textAlignVertical: 'center'
  },
});

export default TravelBudget;