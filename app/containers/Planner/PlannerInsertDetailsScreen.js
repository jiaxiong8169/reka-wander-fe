import React, {useEffect} from 'react';
import {StyleSheet, View, Text, Image, TextInput} from 'react-native';
import Card from '../../components/card/card';

const InsertDetailsCard = props => {
  return (
    <View style={styles.body}>
      <Card style={[styles.card, props.style]}>{props.children}</Card>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    marginBottom: 20,
    marginTop: 30,
    width: '100%',
  },
  card: {},
});

export default InsertDetailsCard;
