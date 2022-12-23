import React from 'react';
import Card from '../card/card';
import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

const InsertDetailsCard = props => {
  const {width} = Dimensions.get('window');

  return (
    <View style={{alignSelf: 'center'}}>
      <Card
        style={{
          margin: 10,
          marginTop: 14,
          // marginBottom: 30,
          width: width*0.8,
        }}>
        {props.children}
      </Card>
    </View>
  );
};

export default InsertDetailsCard;
