import React, {useEffect, useState, useRef} from 'react';
import Card from '../../components/Card';
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import {CustomText} from '../../components/texts/custom-text';
import DefaultLabel from './DefaultLabel';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
export const TagRoom = ({
  roomNum,
  setRoomNum,
  //   sorting,
  //   setMinPriceRange,
  //   maxPriceValue,
  //   minPriceValue,
  //   minPriceRange,
  //   maxPriceRange,
  //   defaultMinValue,
  //   defaultMaxValue,
}) => {
  const sorting = [
    {
      key: 0,
      label: 'Any',
      select: false,
    },
    {
      key: 1,
      label: '1',
      select: false,
    },
    {
      key: 2,
      label: '2',
      select: false,
    },
    {
      key: 3,
      label: '3',
      select: false,
    },
    {
      key: 4,
      label: '4',
      select: false,
    },
  ];

  const [selectedAny, setSelectedAny] = useState(false);

  return (
    <View>
      <View style={{flexDirection: 'row', paddingTop: 10}}>
        <View>
          <TouchableOpacity
            style={{
              backgroundColor: selectedAny === true ? '#4169e1' : 'white',
              borderColor: selectedAny === true ? 'white' : '#4169e1',
              borderWidth: 1,
              borderRadius: 10,
              padding: 8,
              alignItems: 'center',
            }}
            onPress={() => {
              setSelectedAny(current => !current);
              setRoomNum(0);
            }}>
            <Text
              style={{
                color: selectedAny === true ? 'white' : '#4169e1',
                fontSize: 13,
              }}>
              Any
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* {sorting.map(e => {
        <View key={e.key} id={e.key}>
          <Text>{e.key}</Text>
          <TouchableOpacity
            key={e.id}
            style={{
              backgroundColor: selected === true ? 'blue' : 'grey',
            }}
            onPress={() => {
              setSelected(current => !current);
              setRoomNum(e.id);
            }}>
            <Text>{e.label}</Text>
          </TouchableOpacity>
        </View>;
      })} */}

      {/* {sorting.map(e => {
        return(
        <View key={e.key} id={e.key}>
          <TouchableOpacity
            style={{
              backgroundColor: e.select === true ? '#4169e1' : 'white',
              borderColor: e.select === true ? 'white' : '#4169e1',
              borderWidth: 1,
              borderRadius: 10,
              padding: 8,
              alignItems: 'center',
            }}
            onPress={() => {
              e = {...e, select: !e.select}
              setRoomNum(e.key);
            }}>
            <Text
              style={{
                color: selectedAny === true ? 'white' : '#4169e1',
                fontSize: 13,
              }}>
              {e.label}
            </Text>
          </TouchableOpacity>
        </View>
      )})} */}
    </View>
  );
};
