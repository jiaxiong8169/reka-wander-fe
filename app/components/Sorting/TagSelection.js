import React, {useEffect, useState, useRef, Component} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Card from '../../components/Card';
import TagSelectExtension from './TagSelectExtension';
import Collapsible from 'react-native-collapsible';
import {TagSelect} from 'react-native-tag-select';

export const TagSelection = ({
  title,
  setTag,
  data,
  values,
  predefinedIndex,
  suffix,
  label,
  type,
}) => {
  let suffixs = suffix ? suffix : '';
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
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 2,
            }}>
            <Text style={{fontWeight: '400', fontSize: 11, color: 'black'}}>
              {title}
            </Text>
            <Text style={{fontWeight: '700', color: 'black', fontSize: 12}}>
              {values === 0 ? 'Any' : values} {suffixs}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>

      <Collapsible collapsed={expandRoom}>
        <View style={{paddingLeft: 10}}>
          <Text style={styles.labelText}>{label}</Text>
          {type === 'multiple' ? (
            <TagSelect
              value={[data[predefinedIndex]]}
              itemStyle={styles.item}
              itemLabelStyle={styles.label}
              itemStyleSelected={styles.itemSelected}
              itemLabelStyleSelected={styles.labelSelected}
              data={data}
              ref={t => {
                setTag(t);
              }}
            />
          ) : (
            <TagSelectExtension
              value={[data[predefinedIndex]]}
              itemStyle={styles.item}
              itemLabelStyle={styles.label}
              itemStyleSelected={styles.itemSelected}
              itemLabelStyleSelected={styles.labelSelected}
              data={data}
              ref={t => {
                setTag(t);
              }}
            />
          )}
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
    fontSize: 13,
    fontWeight: '500',
    marginVertical: 6,
  },
  item: {
    borderWidth: 1.5,
    borderColor: '#4169e1',
    backgroundColor: '#FFF',
    paddingVertical: 6,
  },
  label: {
    color: '#4169e1',
    fontSize: 12,
  },
  itemSelected: {
    backgroundColor: '#4169e1',
    borderColor: '#4169e1',
  },
  labelSelected: {
    color: '#FFF',
  },
});
