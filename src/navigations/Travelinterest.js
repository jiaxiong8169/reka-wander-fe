import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  SafeAreaView,
} from 'react-native';
import MultiSelectExample from '../component/dropdown/interest';
import Card from '../component/card/card';
// import Multiselect from 'multiselect-react-dropdown';


const TravelInterest = (props) => {
  const [selectedOption, setselectedOption] = useState({ value: '', label: 'Select anything' });

  return (

    // <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.body}>
        <Card>
          <View style={styles.body_container}>
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.question}>
                {props.quest}
              </Text>
            </View>
            <MultiSelectExample />

            <View style={{ marginTop: 10, }}>
              <Image
                source={require('../assets/Travel_interest.png')}
                style={{
                  // flex: 1,
                  // aspectRatio: 1, // Your aspect ratio
                  width: 260,
                  resizeMode: 'contain',
                  height: 200,
                }}
              />
            </View>
          </View>
        </Card>
      </View>
    // </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 40,
  },
  body: {
    margin: 10,
    marginHorizontal: '8%',
    //this is to format the dropdown box, it fix this issue => when click more than 2, the card will become fat
  },
  body_container: {
  },
  question: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'sans-serif-medium',
    fontWeight: 'bold',
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

export default TravelInterest;