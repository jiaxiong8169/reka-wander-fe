import React, {useEffect, useState, useRef, Component} from 'react';
import {
  View,
  StyleSheet,
  Button,
  Alert,
  Text,
  TouchableOpacity,
} from 'react-native';
import Card from '../../components/Card';
import TagSelectExtension from './TagSelectExtension';
import Collapsible from 'react-native-collapsible';

export const TagSelection = ({
  tag,
  setTag,
//   onPressExpandRoom,
//   expandRoom,
  roomNum,
}) => {
  const data = [
    {id: 1, label: 'Any'},
    {id: 2, label: '1'},
    {id: 3, label: '2'},
    {id: 4, label: '3'},
    {id: 5, label: '4'},
  ];
  const [expandRoom, setExpandRoom] = useState(true);
  const onPressExpandRoom = () => {
    setExpandRoom(current => !current);
  };

  return (
    <View>
      <TouchableOpacity onPress={onPressExpandRoom}>
        <Card
          style={{
            backgroundColor: 'aliceblue',
            shadowColor: 'white',
          }}>
          <Text style={{fontWeight: '400', fontSize: 12, color: 'black'}}>
            Select Number of Bedrooms
          </Text>

          <Text style={{fontWeight: '700', color: 'black', fontSize: 14}}>
            {roomNum} room(s)
          </Text>
        </Card>
      </TouchableOpacity>
      <Collapsible collapsed={expandRoom}>
        <View style={{paddingLeft: 10}}>
          <Text style={styles.labelText}>Number of Rooms</Text>
          <TagSelectExtension
            itemStyle={styles.item}
            itemLabelStyle={styles.label}
            itemStyleSelected={styles.itemSelected}
            itemLabelStyleSelected={styles.labelSelected}
            data={data}
            ref={t => {
              setTag(t);
            }}
          />
        </View>
      </Collapsible>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContainer: {
    padding: 15,
  },
  buttonInner: {
    marginBottom: 15,
  },
  labelText: {
    color: '#333',
    fontSize: 15,
    fontWeight: '500',
    marginVertical: 13,
  },
  item: {
    borderWidth: 1,
    borderColor: '#333',
    backgroundColor: '#FFF',
  },
  label: {
    color: '#333',
  },
  itemSelected: {
    backgroundColor: '#4169e1',
    borderColor: '#4169e1',
  },
  labelSelected: {
    color: '#FFF',
  },
});
