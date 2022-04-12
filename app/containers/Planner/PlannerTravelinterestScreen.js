import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import MultiSelectExample from '../../components/dropdown/interest';
import Card from '../../components/card/card';
// import Multiselect from 'multiselect-react-dropdown';
// import { LogBox } from 'react-native'

// LogBox.ignoreWarnings([
//   'VirtualizedLists should never be nested', // TODO: Remove when fixed
// ])

const TravelInterest = props => {
  return (
    // <ScrollView>
    // <SafeAreaView>
    <TouchableWithoutFeedback>
      <View style={styles.body}>
        <Card
          style={{
            width: '100%',
          }}>
          <View style={styles.body_container}>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.question}>{props.quest}</Text>
            </View>
            <MultiSelectExample />

            <View style={{marginTop: 10}}>
              <Image
                source={require('../../assets/Travel_interest.png')}
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
        </Card>
      </View>
    </TouchableWithoutFeedback>
    // </SafeAreaView>
    // </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    // marginBottom: 20,
    // marginTop:30,
    // marginHorizontal: '8%',
    marginBottom: 20,
    marginTop: 30,
    // marginHorizontal: '1%',
    width: '100%',
    //this is to format the dropdown box, it fix this issue => when click more than 2, the card will become fat
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
